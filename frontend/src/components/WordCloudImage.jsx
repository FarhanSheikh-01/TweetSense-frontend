import React, { useEffect, useState } from "react";
import axios from "axios";

// Choose API_BASE via env for best practice or hardcode as you like
const API_BASE =
  import.meta.env.VITE_API_BASE;

function WordCloudImage({ tweets }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tweets || tweets.length === 0) {
      setImgUrl(null);
      setError(null);
      return;
    }

    const generateWordCloud = async () => {
      try {
        setError(null); // reset previous error
        setImgUrl(null); // optional: force rerender loading message
        const response = await axios.post(`${API_BASE}/visualize/wordcloud`, { tweets });
        // Ensure URL is formed correctly
        let url = response.data.url;
        if (!url.startsWith("http")) {
          url = API_BASE.replace(/\/$/, "") + url;
        }
        setImgUrl(url);
      } catch (e) {
        console.error("Failed to generate wordcloud:", e);
        setError("Failed to generate word cloud. Please try again.");
      }
    };

    generateWordCloud();
  }, [tweets]);

  if (!tweets || tweets.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg">
        No tweets available for word cloud.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mb-10 px-6 ml-auto mr-auto max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Word Cloud of Top Keywords
      </h2>
      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : imgUrl ? (
        <img
          src={imgUrl}
          alt="Word Cloud"
          className="max-w-full sm:max-w-[600px] max-h-[500px] rounded-xl shadow-md border border-gray-200"
        />
      ) : (
        <p className="text-gray-600">Generating Word Cloud...</p>
      )}
    </div>
  );
}

export default WordCloudImage;
