import express from "express";
import { Booking } from "./models.js";
import { protect } from "./middleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { service, date, time } = req.body;

    if (!service || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

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