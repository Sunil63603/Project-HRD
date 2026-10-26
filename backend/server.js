require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

client
  .connect()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(console.error);

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Login required" });
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireHR = (req, res, next) => {
  if (req.user.role !== "registeredHRs") {
    return res.status(403).json({ message: "HR access only" });
  }

  next();
};

app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({
    id: req.user.id,
    role: req.user.role,
    USN: req.user.USN,
  });
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.json({ message: "Logout successful" });
});

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await client
      .db("HRD-Database")
      .collection("jobs")
      .find({})
      .toArray();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
});

app.post("/api/jobs", requireAuth, requireHR, async (req, res) => {
  try {
    const job = req.body;

    const result = await client
      .db("HRD-Database")
      .collection("jobs")
      .insertOne(job);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job", error });
  }
});

app.delete("/api/jobs/:id", requireAuth, requireHR, async (req, res) => {
  try {
    const result = await client
      .db("HRD-Database")
      .collection("jobs")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (!result.deletedCount) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid job ID", error });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!["registeredHRs", "registeredStuds"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await client
      .db("HRD-Database")
      .collection(role)
      .findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role, USN: user.USN },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      role,
      USN: user.USN,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

const studentsCollection = client
  .db("HRD-Database")
  .collection("registeredStuds");

// 1. Fetch all students
app.get("/api/students", requireAuth, async (req, res) => {
  try {
    const students = await studentsCollection
      .find({}, { projection: { password: 0, conversationsWithHR: 0 } })
      .toArray();

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error });
  }
});

// 2. Fetch student by USN
app.get("/api/students/:usn", requireAuth, async (req, res) => {
  try {
    const student = await studentsCollection.findOne(
      { USN: req.params.usn },
      { projection: { password: 0, conversationsWithHR: 0 } },
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student", error });
  }
});

// Authorization shared by HR conversations
const canAccessConversation = (req) =>
  req.user.role === "registeredHRs" ||
  (req.user.role === "registeredStuds" && req.user.USN === req.params.usn);

// 3. Fetch HR conversations
app.get("/api/students/:usn/messages", requireAuth, async (req, res) => {
  if (!canAccessConversation(req)) {
    return res.sendStatus(403);
  }

  try {
    const student = await studentsCollection.findOne(
      { USN: req.params.usn },
      { projection: { conversationsWithHR: 1 } },
    );

    if (!student) return res.sendStatus(404);

    res.json(student.conversationsWithHR || []);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
});

// 4. Send HR conversation message
app.post("/api/students/:usn/messages", requireAuth, async (req, res) => {
  if (!canAccessConversation(req)) {
    return res.sendStatus(403);
  }

  const { content } = req.body;

  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ message: "Message required" });
  }

  const message = {
    sender: req.user.role === "registeredHRs" ? "HR" : "student",
    content: content.trim(),
    timestamp: new Date().toISOString(),
  };

  try {
    const result = await studentsCollection.updateOne(
      { USN: req.params.usn },
      { $push: { conversationsWithHR: message } },
    );

    if (!result.matchedCount) return res.sendStatus(404);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
});

// Update student profile
app.put("/api/students/:usn", requireAuth, async (req, res) => {
  // Students can edit only their own profile
  if (req.user.role !== "registeredStuds" || req.user.USN !== req.params.usn) {
    return res.sendStatus(403);
  }

  // Only these fields are editable
  const allowedFields = [
    "name",
    "email",
    "website",
    "phoneNumber",
    "skills",
    "resumes",
    "socialContacts",
    "Projects",
  ];

  const updates = Object.fromEntries(
    Object.entries(req.body || {}).filter(([key]) =>
      allowedFields.includes(key),
    ),
  );

  if (!Object.keys(updates).length) {
    return res.status(400).json({ message: "No valid fields provided" });
  }

  // Basic field validation
  const valid = Object.entries(updates).every(([key, value]) => {
    if (["name", "email", "website", "phoneNumber"].includes(key))
      return typeof value === "string";

    if (["skills", "resumes"].includes(key))
      return (
        Array.isArray(value) && value.every((item) => typeof item === "string")
      );

    if (key === "socialContacts")
      return (
        value &&
        typeof value === "object" &&
        ["whatsapp", "linkedIn"].every(
          (field) => typeof value[field] === "string",
        )
      );

    if (key === "Projects")
      return (
        Array.isArray(value) &&
        value.every(
          (project) =>
            project &&
            ["title", "GitHub_Repo", "deployLink"].every(
              (field) => typeof project[field] === "string",
            ),
        )
      );

    return false;
  });

  if (!valid || ("email" in updates && !updates.email.trim())) {
    return res.status(400).json({ message: "Invalid profile data" });
  }

  try {
    const studentId = new ObjectId(req.user.id);

    // Prevent duplicate login emails
    if (updates.email) {
      const existing = await studentsCollection.findOne({
        email: updates.email,
        _id: { $ne: studentId },
      });

      if (existing) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    const result = await studentsCollection.updateOne(
      { _id: studentId, USN: req.params.usn },
      { $set: updates },
    );

    if (!result.matchedCount) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
