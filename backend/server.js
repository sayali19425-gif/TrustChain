const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors()); app.use(express.json());
mongoose.connect("mongodb://localhost:27017/escrow");

const Project = mongoose.model("Project", new mongoose.Schema({
  title: String, client: String, freelancer: String,
  amount: String, status: { type: String, default: "ACTIVE" }, txHash: String
}));

app.post("/api/projects", async (req, res) => res.json(await new Project(req.body).save()));
app.get("/api/projects", async (req, res) => res.json(await Project.find().sort({ _id: -1 })));

app.listen(5000, () => console.log("Server on port 5000"));