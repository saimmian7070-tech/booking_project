import { useEffect, useState } from "react";
import API from "./api";

export default function Booking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);

  const services = [
    "Haircut",
    "Massage",
    "Cleaning",
    "Consultation",
    "Repair",
  ];

  const fetchBookings = async () => {
    const res = await API.get("/bookings");
    setBookings(res.data);
  };

  const bookService = async (service) => {
    const safeService = String(service || "").trim();

    if (!safeService) {
      alert("Invalid service selected");
      return;
    }

    if (!date || !time) {
      alert("Please select date and time first");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (selectedDateTime < now) {
      alert("You cannot book a past date/time");
      return;
    }

    await API.post("/bookings", {
      service,
      date,
      time,
    });

    setDate("");
    setTime("");
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const styles = {
  page: {
  minHeight: "100vh",
  padding: "45px",
  fontFamily: "system-ui, -apple-system, Segoe UI",

  background: `
    radial-gradient(circle at 10% 20%, rgba(99,102,241,0.15), transparent 35%),
    radial-gradient(circle at 90% 30%, rgba(236,72,153,0.12), transparent 40%),
    radial-gradient(circle at 50% 90%, rgba(34,197,94,0.10), transparent 40%),
    linear-gradient(180deg, #f8fafc, #eef2ff)
  `,
},

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  title: {
    fontSize: "30px",
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: "-0.5px",
  },

  logout: {
    padding: "10px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(239,68,68,0.2)",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: "0 12px 25px rgba(239,68,68,0.25)",
    transition: "all 0.2s ease",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    maxWidth: "1150px",
    margin: "auto",
  },

  card: {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(14px)",
    borderRadius: "24px",
    padding: "30px",
    border: "1px solid rgba(226,232,240,0.8)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    transition: "0.3s ease",
  },

  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginTop: "14px",
  },

  serviceCard: {
    padding: "20px",
    borderRadius: "18px",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    textAlign: "center",
    background:
      "linear-gradient(145deg, #ffffff, #f1f5f9)",
    fontWeight: "800",
    color: "#1e293b",
    transition: "all 0.25s ease",
    boxShadow: "0 8px 18px rgba(0,0,0,0.04)",
  },

  serviceHover: {
    transform: "translateY(-6px) scale(1.04)",
    border: "1px solid #6366f1",
    boxShadow: "0 20px 40px rgba(99,102,241,0.25)",
    background: "#ffffff",
  },

  input: {
    width: "100%",
    padding: "15px",
    marginTop: "14px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    outline: "none",
    background: "#f8fafc",
    fontSize: "14px",
    transition: "0.2s",
  },

  dateBox: {
    marginTop: "18px",
  },

  label: {
    fontSize: "12px",
    fontWeight: "900",
    color: "#64748b",
    marginBottom: "6px",
    display: "block",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
  },

  dateInput: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    fontSize: "14px",
    color: "#0f172a",
    outline: "none",
    cursor: "pointer",
  },

  bookingItem: {
    padding: "16px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, #ffffff, #f8fafc)",
    border: "1px solid #e2e8f0",
    marginBottom: "12px",
    transition: "0.2s",
  },

  meta: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "6px",
  },

  note: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "14px",
  },
};

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.title}>Booking Dashboard</div>
        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <h3>Select a Service</h3>

          <p style={styles.note}>
            Click any service to book instantly
          </p>

          <div style={styles.serviceGrid}>
            {services.map((s) => (
              <div
                key={s}
                style={styles.serviceCard}
                onClick={() => bookService(s)}
                onMouseOver={(e) =>
                  Object.assign(e.currentTarget.style, styles.serviceHover)
                }
                onMouseOut={(e) =>
                  Object.assign(e.currentTarget.style, {
                    transform: "scale(1)",
                    boxShadow: "none",
                    border: "1px solid #d1d5db",
                    background: "#f9fafb",
                  })
                }
              >
                {s}
              </div>
            ))}
          </div>

          <div style={styles.dateBox}>
            <div style={styles.label}>Select Date</div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.dateInput}
            />
          </div>

          <input
            style={styles.input}
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div style={styles.card}>
          <h3>Your Bookings</h3>

          {bookings.length === 0 ? (
            <p>No bookings yet</p>
          ) : (
            bookings.map((b, i) => (
              <div key={i} style={styles.bookingItem}>
                <div style={{ fontWeight: "700" }}>
                  {b.service || b.title || "Unknown Service"}
                </div>
                <div style={styles.meta}>
                  {b.date} • {b.time}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}