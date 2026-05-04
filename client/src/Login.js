import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      navigate("/bookings");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Invalid credentials. Please try again.";
      alert(msg);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #eef2f3, #e0e7ff)",
      fontFamily: "Inter, Arial, sans-serif",
    },

    card: {
      width: "380px",
      padding: "30px",
      borderRadius: "14px",
      background: "#fff",
      boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
      textAlign: "center",
    },

    title: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "5px",
      color: "#222",
    },

    subtitle: {
      fontSize: "13px",
      color: "#666",
      marginBottom: "20px",
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      outline: "none",
      fontSize: "14px",
    },

    btn: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(135deg, #4f46e5, #2563eb)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
      marginTop: "5px",
    },

    footer: {
      marginTop: "15px",
      fontSize: "13px",
      color: "#666",
    },

    link: {
      color: "#2563eb",
      cursor: "pointer",
      fontWeight: "600",
      marginLeft: "5px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={login}>
          Login
        </button>

        <div style={styles.footer}>
          Don’t have an account?
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}