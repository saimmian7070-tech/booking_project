import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (value) => {
    setEmail(value);

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email (example@gmail.com)");
    } else {
      setEmailError("");
    }
  };

  const register = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (emailError) {
      alert("Please fix email before submitting");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await API.post("/auth/register", { name, email, password });

      alert("Account created successfully!");
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Registration failed";

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
      marginBottom: "20px",
      fontSize: "22px",
      fontWeight: "700",
      color: "#222",
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
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={{
            ...styles.input,
            border: emailError ? "1px solid red" : "1px solid #ddd",
          }}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
        />

        {emailError && (
          <div style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
            {emailError}
          </div>
        )}

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={register}>
          Register
        </button>

        <div style={styles.footer}>
          Already have an account?
          <span style={styles.link} onClick={() => navigate("/")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}