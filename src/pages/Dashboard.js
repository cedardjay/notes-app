import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Fetch notes from Firestore
  // Fetch notes from Firestore
const fetchNotes = async () => {
  const q = query(collection(db, "notes"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  setNotes(data);
  setLoading(false);
};

useEffect(() => {
  fetchNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // Create a new note
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await addDoc(collection(db, "notes"), {
      title,
      content,
      uid: user.uid,
      createdAt: new Date(),
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  // Delete a note
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    fetchNotes();
  };

  // Sign out
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f9fafb" }}>

      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h2 style={{ margin: 0, color: "#4f46e5" }}>📝 CedardNotes</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>{user.email}</span>
          <button onClick={handleSignOut} style={{ padding: "0.5rem 1rem", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>

        {/* Create Note Form */}
        <div style={{ background: "white", borderRadius: "10px", padding: "1.5rem", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h3 style={{ marginTop: 0 }}>Create a New Note</h3>
          <form onSubmit={handleCreate}>
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
              rows={4}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #e5e7eb", boxSizing: "border-box", resize: "vertical" }}
            />
            <button type="submit" style={{ marginTop: "0.8rem", padding: "0.6rem 1.5rem", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              Add Note
            </button>
          </form>
        </div>

        {/* Notes List */}
        <h3>Your Notes ({notes.length})</h3>
        {loading && <p>Loading notes...</p>}
        {!loading && notes.length === 0 && <p style={{ color: "#6b7280" }}>No notes yet. Create one above!</p>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {notes.map((note) => (
            <div key={note.id} style={{ background: "white", borderRadius: "10px", padding: "1.2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <h4 style={{ margin: "0 0 0.5rem", color: "#1e1b4b" }}>{note.title}</h4>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "0 0 1rem" }}>{note.content}</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => navigate(`/edit/${note.id}`)} style={{ padding: "0.4rem 1rem", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(note.id)} style={{ padding: "0.4rem 1rem", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;