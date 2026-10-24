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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
