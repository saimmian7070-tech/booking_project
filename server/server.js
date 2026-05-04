import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import auth from "./auth.js";
import bookings from "./bookings.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

connectDB();

app.use("/auth", auth);
app.use("/bookings", bookings);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});