import React from "react";

export const Dashboard = () => {
  // Placeholder for chart/insight UI
  return (
    <section className="card app-abstract-bg" style={{ minHeight: 400 }}>
      <h2 style={{ fontWeight: 700, fontSize: "2rem" }}>Dashboard Insights</h2>
      <div
        style={{
          display: "flex",
          gap: 32,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 32,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 12px #18181811",
            padding: 24,
            minWidth: 220,
          }}
        >
          <h3 style={{ color: "#181818", fontWeight: 600 }}>Sales Overview</h3>
          <div
            style={{
              height: 120,
              background: "#61dafb22",
              borderRadius: 8,
              margin: "12px 0",
            }}
          />
        </div>
        <div
          style={{
            background: "#181818",
            color: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 12px #18181822",
            padding: 24,
            minWidth: 220,
          }}
        >
          <h3 style={{ color: "#61dafb", fontWeight: 600 }}>Customer Trends</h3>
          <div
            style={{
              height: 120,
              background: "#fff2",
              borderRadius: 8,
              margin: "12px 0",
            }}
          />
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 12px #18181811",
            padding: 24,
            minWidth: 220,
          }}
        >
          <h3 style={{ color: "#181818", fontWeight: 600 }}>
            Product Insights
          </h3>
          <div
            style={{
              height: 120,
              background: "#61dafb22",
              borderRadius: 8,
              margin: "12px 0",
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: 40, color: "#888", fontSize: 18 }}>
        <em>Ask questions in natural language to get instant insights!</em>
      </div>
    </section>
  );
};
