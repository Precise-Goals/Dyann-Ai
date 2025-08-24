import React, { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const Dyann = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dashboardReady, setDashboardReady] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(setUser);
  }, []);

  const handleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDashboardReady(false);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a CSV file.");
    setUploading(true);
    setError("");
    try {
      // Simulate upload and LLM processing (replace with real API call)
      await new Promise((res) => setTimeout(res, 1200));
      setDashboardReady(true);
    } catch {
      setError("Failed to process file.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div
        className="card app-abstract-bg"
        style={{ minHeight: 320, textAlign: "center" }}
      >
        <h2>Sign in to upload your data</h2>
        <button
          className="bright-accent"
          style={{ fontWeight: 600, fontSize: 18, padding: "0.8rem 2rem" }}
          onClick={handleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <section className="card app-abstract-bg" style={{ minHeight: 320 }}>
      <h2 style={{ fontWeight: 700, fontSize: "2rem" }}>Upload your CSV</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ margin: "1.5rem 0" }}
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bright-accent"
        style={{
          fontWeight: 600,
          fontSize: 18,
          padding: "0.8rem 2rem",
          marginLeft: 12,
        }}
      >
        {uploading ? "Processing..." : "Analyze & Enable Dashboard"}
      </button>
      {dashboardReady && (
        <a
          href="/dashboard"
          className="bright-accent"
          style={{
            display: "block",
            marginTop: 24,
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          Go to Dashboard →
        </a>
      )}
      {error && <div style={{ color: "#e74c3c", marginTop: 12 }}>{error}</div>}
    </section>
  );
};
