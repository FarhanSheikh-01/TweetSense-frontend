import React, { useState } from "react";

const options = [
  { label: "Username", value: "username" },
  { label: "Hashtags", value: "hashtag" },
  { label: "Twitter ID", value: "id" },
];

const SearchBY = ({ onSearch, loading }) => {
  const [searchBy, setSearchBy] = useState(options[0].value);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query || query.trim() === "") {
      setError("* Please enter a search query.");
      return;
    }
    setError("");
    if (!loading) onSearch(query.trim(), searchBy);
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.7)",
          padding: "0",
          borderRadius: "12px",
          maxWidth: "480px",
          margin: "32px auto",
          border: "1.5px solid #6366f1",
          boxShadow: "0 1px 8px rgba(99,102,241,0.08)",
        }}
      >
        <div style={{ position: "relative" }}>
          <button type="button" style={dropdownButtonStyle} disabled={loading}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {options.find((o) => o.value === searchBy)?.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4B5563"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>
          <select
            id="searchby-select"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            style={selectOverlayStyle}
            disabled={loading}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder={`Search by ${searchBy}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
          disabled={loading}
        />

        <button type="submit" style={submitButtonStyle} aria-label="Search" disabled={loading}>
          {loading ? <span>Loading...</span> : searchIcon}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
          {error}
        </div>
      )}
    </>
  );
};

// STYLES
const dropdownButtonStyle = {
  padding: "12px 14px",
  border: "none",
  background: "rgba(255,255,255,0.2)",
  fontSize: "1rem",
  color: "#374151",
  cursor: "pointer",
  borderTopLeftRadius: "12px",
  borderBottomLeftRadius: "12px",
};

const selectOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
  cursor: "pointer",
  zIndex: 2,
};

const inputStyle = {
  padding: "12px 14px",
  border: "none",
  fontSize: "1rem",
  flex: 1,
  background: "rgba(255,255,255,0.2)",
  color: "#111827",
  outline: "none",
  zIndex: 2,
};

const submitButtonStyle = {
  padding: "12px 18px",
  border: "none",
  background: "transparent",
  borderTopRightRadius: "12px",
  borderBottomRightRadius: "12px",
  cursor: "pointer",
  zIndex: 2,
};

const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#6366f1"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" strokeLinecap="round" />
  </svg>
);

export default SearchBY;
