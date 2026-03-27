import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "2rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
      <h2>Create Account</h2>

      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "0.7rem", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default Signup;