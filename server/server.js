// import express from "express";
// import cors from "cors";
// import connectDB from "./db.js";
// import auth from "./auth.js";
// import bookings from "./bookings.js";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // connect DB
// connectDB();

// // routes
// app.use("/auth", auth);
// app.use("/bookings", bookings);

// app.listen(5000, () => {
//   console.log("Server running on 5000");
// });

import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import auth from "./auth.js";
import bookings from "./bookings.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS FIX (safe for dev + production testing)
app.use(cors({ origin: true }));

app.use(express.json());

// DB
connectDB();

// Routes
app.use("/auth", auth);
app.use("/bookings", bookings);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});