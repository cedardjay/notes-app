import { Link } from "react-router-dom";

function Landing() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>

      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ margin: 0, color: "#4f46e5" }}>📝 WeaveNote</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/signin" style={{ padding: "0.5rem 1rem", color: "#4f46e5", textDecoration: "none", fontWeight: "bold" }}>Sign In</Link>
          <Link to="/signup" style={{ padding: "0.5rem 1rem", background: "#4f46e5", color: "white", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "6rem 2rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#1e1b4b" }}>
          Your thoughts, organized.
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#6b7280", maxWidth: "500px", margin: "0 auto 2rem" }}>
          A simple and clean place to write, save, and manage all your notes — from anywhere.
        </p>
        <Link to="/signup" style={{ padding: "0.8rem 2rem", background: "#4f46e5", color: "white", borderRadius: "8px", textDecoration: "none", fontSize: "1.1rem", fontWeight: "bold" }}>
          Get Started for Free
        </Link>
      </div>

      {/* Features Section */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", padding: "3rem 2rem", background: "#f9fafb", flexWrap: "wrap" }}>
        {[
          { icon: "✍️", title: "Create Notes", desc: "Quickly jot down your ideas anytime." },
          { icon: "✏️", title: "Edit Anytime", desc: "Update your notes whenever you need." },
          { icon: "🗑️", title: "Stay Clean", desc: "Delete notes you no longer need." },
        ].map((feature) => (
          <div key={feature.title} style={{ background: "white", borderRadius: "10px", padding: "2rem", width: "220px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "2.5rem" }}>{feature.icon}</div>
            <h3 style={{ margin: "0.8rem 0 0.4rem" }}>{feature.title}</h3>
            <p style={{ color: "#6b7280", margin: 0 }}>{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "2rem", color: "#9ca3af", fontSize: "0.9rem" }}>
        © 2025 NoteApp. Built with React & Firebase.
      </footer>

    </div>
  );
}

export default Landing;