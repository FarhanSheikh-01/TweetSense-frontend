import React, { useEffect, useState } from "react";
import axios from "axios";

// COLORS should match your dashboard theme (demonstrates customization)
const CARD_BG = "#fff";
const CARD_BORDER = "#dae6ef";
const CARD_SHADOW = "0 2px 10px rgba(99,102,241,0.07)"; // same as dashboard
const CARD_RADIUS = 18;

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";
const API_BASE = import.meta.env.VITE_API_BASE;

function HeatmapImage({ tweets }) {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (!tweets || tweets.length === 0) return;

    const generateHeatmap = async () => {
      try {
        const response = await axios.post(`${API_BASE}/visualize/heatmap`, { tweets });
        setImgUrl(API_BASE + response.data.url);
      } catch (error) {
        console.error("Failed to generate heatmap:", error);
      }
    };

    generateHeatmap();
  }, [tweets]);

  if (!tweets || tweets.length === 0) {
    return (
      <div
        style={{
          background: CARD_BG,
          border: `1.5px solid ${CARD_BORDER}`,
          borderRadius: CARD_RADIUS,
          boxShadow: CARD_SHADOW,
          padding: "36px 20px",
          textAlign: "center",
          margin: "32px auto",
          maxWidth: 820,
        }}
      >
        <p>No tweets available for heatmap.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: CARD_BG,
        border: `1.5px solid ${CARD_BORDER}`,
        borderRadius: CARD_RADIUS,
        boxShadow: CARD_SHADOW,
        padding: "36px 20px 32px 20px",
        textAlign: "center",
        margin: "0px auto",
        maxWidth: 820,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ fontFamily: "Inter,sans-serif", color: "#6366F1", fontWeight: 600, marginBottom: 18, letterSpacing: 0.3 }}>
        Engagement Heatmap (by Sentiment &amp; Hour)
      </h3>
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="Engagement Heatmap"
          style={{
            maxWidth: "100%",
            maxHeight: 420,
            background: "#fff",
            margin: "0 auto",
            display: "block"
          }}
        />
      ) : (
        <p style={{ marginTop: 48 }}>Generating Heatmap...</p>
      )}
    </div>
  );
}

export default HeatmapImage;
