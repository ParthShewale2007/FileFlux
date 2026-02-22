import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import File from "./models/File.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =============================
   MongoDB Connection
============================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

/* =============================
   Multer Setup
============================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* =============================
   Upload API
============================= */

app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const files = req.files;

    const savedFiles = await Promise.all(
      files.map(file => {
        const newFile = new File({
          filename: file.filename,
          originalname: file.originalname,
          size: file.size
        });
        return newFile.save();
      })
    );

    res.json({ message: "Files uploaded", files: savedFiles });

  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

/* =============================
   Get History API
============================= */

app.get("/files", async (req, res) => {
  const files = await File.find().sort({ uploadDate: -1 });
  res.json(files);
});

/* =============================
   Delete API
============================= */

app.delete("/files/:id", async (req, res) => {
  await File.findByIdAndDelete(req.params.id);
  res.json({ message: "File deleted" });
});

/* =============================
   Start Server
============================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});