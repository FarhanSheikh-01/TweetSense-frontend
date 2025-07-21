import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%", // ✅ FIXED: avoids horizontal overflow
        minHeight: "120px",
        padding: "32px 0",
        textAlign: "center",
        // background: "linear-gradient(to top left, #f9fbfc, #e9f1f8)",
        fontFamily: "'Inter', 'Roboto', sans-serif",
        fontSize: 15,
        color: "#4b5563",
        borderTop: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 20, color: "#1f2937", marginBottom: 6 }}>
        Sentiment Analysis Dashboard
      </div>
      <div style={{ fontSize: 14 }}>
        © {new Date().getFullYear()} | Built by <strong>Sheikh Farhan</strong>
      </div>
    </footer>
  );
}
