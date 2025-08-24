import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    feedback: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    const reviewsRef = ref(db, "reviews");
    onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setReviews(Object.values(data));
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const db = getDatabase();
    const reviewsRef = ref(db, "reviews");
    await push(reviewsRef, {
      user_name: form.name,
      user_contact: form.contact,
      user_email: form.email,
      feedback: form.feedback,
      timestamp: Date.now(),
    });
    setForm({ name: "", contact: "", email: "", feedback: "" });
    setSubmitting(false);
  };

  return (
    <section
      className="card app-abstract-bg"
      style={{ minHeight: 320, maxWidth: 600, margin: "2rem auto" }}
    >
      <h2 style={{ fontWeight: 700, fontSize: "2rem" }}>Customer Reviews</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={{
            margin: 8,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #eee",
            width: "45%",
          }}
        />
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact"
          required
          style={{
            margin: 8,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #eee",
            width: "45%",
          }}
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{
            margin: 8,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #eee",
            width: "94%",
          }}
        />
        <textarea
          name="feedback"
          value={form.feedback}
          onChange={handleChange}
          placeholder="Your feedback..."
          required
          style={{
            margin: 8,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #eee",
            width: "94%",
            minHeight: 60,
          }}
        />
        <button
          type="submit"
          disabled={submitting}
          className="bright-accent"
          style={{
            fontWeight: 600,
            fontSize: 18,
            padding: "0.8rem 2rem",
            margin: 8,
          }}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      <div style={{ maxHeight: 220, overflowY: "auto" }}>
        {reviews.length === 0 && (
          <div style={{ color: "#888" }}>No reviews yet.</div>
        )}
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px #18181811",
              margin: "12px 0",
              padding: 16,
              textAlign: "left",
            }}
          >
            <div style={{ fontWeight: 600 }}>
              {r.user_name}{" "}
              <span style={{ color: "#61dafb", fontWeight: 400, fontSize: 14 }}>
                ({r.user_email})
              </span>
            </div>
            <div style={{ color: "#181818", margin: "6px 0" }}>
              {r.feedback}
            </div>
            <div style={{ color: "#888", fontSize: 13 }}>
              {new Date(r.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
