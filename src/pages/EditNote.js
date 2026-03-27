import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

function EditNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the existing note
  useEffect(() => {
    const fetchNote = async () => {
      const docRef = doc(db, "notes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setContent(docSnap.data().content);
      } else {
        navigate("/dashboard");
      }
      setLoading(false);
    };
    fetchNote();
  }, [id, navigate]);

  // Save updated note
  const handleUpdate = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "notes", id);
    await updateDoc(docRef, { title, content });
    navigate("/dashboard");
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</p>;

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f9fafb" }}>

      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h2 style={{ margin: 0, color: "#4f46e5" }}>📝 NoteApp</h2>
        <button onClick={() => navigate("/dashboard")} style={{ padding: "0.5rem 1rem", background: "#6b7280", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          ← Back
        </button>
      </nav>

      <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1rem" }}>
        <div style={{ background: "white", borderRadius: "10px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>Edit Note</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: "0.6rem", marginBottom: "0.8rem", borderRadius: "6px", border: "1px solid #e5e7eb", boxSizing: "border-box" }}
            />
            <textarea
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #e5e7eb", boxSizing: "border-box", resize: "vertical" }}
            />
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.8rem" }}>
              <button type="submit" style={{ padding: "0.6rem 1.5rem", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                Save Changes
              </button>
              <button type="button" onClick={() => navigate("/dashboard")} style={{ padding: "0.6rem 1.5rem", background: "#6b7280", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default EditNote;