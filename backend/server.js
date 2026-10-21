require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

client
  .connect()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(console.error);

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running successfully!");
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

app.post("/api/jobs", async (req, res) => {
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

app.delete("/api/jobs/:id", async (req, res) => {
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
