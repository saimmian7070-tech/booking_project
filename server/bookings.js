import express from "express";
import { Booking } from "./models.js";
import { protect } from "./middleware.js";

const router = express.Router();

// CREATE BOOKING (for logged in user)
router.post("/", protect, async (req, res) => {
  try {
    const { service, date, time } = req.body;

    // 🔥 basic validation
    if (!service || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔥 combine date + time
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    // 🚫 block past bookings
    if (selectedDateTime < now) {
      return res.status(400).json({
        message: "Cannot book past date or time",
      });
    }

    const booking = await Booking.create({
      userId: req.userId,
      service,
      date,
      time,
    });

    console.log("CREATED BOOKING:", booking);

    res.json(booking);
  } catch (err) {
  console.log("BOOKING ERROR:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(
      (val) => val.message
    );

    return res.status(400).json({
      message: messages.join(", "),
    });
  }

  res.status(500).json({ message: "Server error" });
}
});

// GET ONLY USER BOOKINGS
router.get("/", protect, async (req, res) => {
  const bookings = await Booking.find({ userId: req.userId });

  const cleaned = bookings.map((b) => ({
    _id: b._id,
    service: b.service || b.title || "Unknown Service",
    date: b.date,
    time: b.time,
  }));

  res.json(cleaned);
});

export default router;