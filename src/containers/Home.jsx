import React from "react";

export const Home = () => (
  <section className="card app-abstract-bg" style={{ minHeight: 320 }}>
    <h1 style={{ fontWeight: 700, fontSize: "2.5rem", marginBottom: 8 }}>
      <span className="bright-accent">Dyann</span> Data Analyst Assistant
    </h1>
    <p
      style={{
        fontSize: "1.2rem",
        maxWidth: 600,
        margin: "0 auto",
        color: "#444",
      }}
    >
      Unlock insights from your data with natural language. Upload your CSV, ask
      questions, and let Dyann's AI-powered assistant analyze, visualize, and
      explain your business data in seconds. Fast, secure, and beautifully
      simple.
    </p>
    <ul
      style={{
        textAlign: "left",
        margin: "2rem auto 0",
        maxWidth: 500,
        color: "#333",
        fontSize: "1.1rem",
      }}
    >
      <li>🔒 Secure, authenticated access</li>
      <li>⚡ Lightning-fast LLM-powered analysis</li>
      <li>📊 Beautiful, interactive dashboards</li>
      <li>🗣️ Voice-enabled AI assistant</li>
      <li>💬 Real customer feedback & reviews</li>
    </ul>
  </section>
);
