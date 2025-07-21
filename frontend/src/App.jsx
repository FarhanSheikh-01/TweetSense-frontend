import { useState } from "react";
import Navbar from "./components/navbar";
import SearchBY from "./components/searchBY";
import Chat1 from "./components/pie";
import { Container, Typography, Box, Modal, Fade } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TimelineIcon from "@mui/icons-material/Timeline";
import TwitterIcon from "@mui/icons-material/Twitter";
import SwitchSeriesType from "./components/bar";
import axios from "axios";
import { extractTopKeywords } from "./utils/extractTopKeywords";
import Footer from "./components/Footer";
import WordCloudImage from "./components/WordCloudImage";
import HeatmapImage from "./components/HeatmapImage";

function App() {
  const [tweets, setTweets] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [showTweetsPopup, setShowTweetsPopup] = useState(false);
  const [showKeywordsPopup, setShowKeywordsPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);

  // API base from .env or fallback
  // const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";
  const API_BASE = import.meta.env.VITE_API_BASE ;

  const handleSearchTrigger = async (searchValue, searchType = "username") => {
    if (!searchValue || typeof searchValue !== "string" || searchValue.trim() === "") {
      alert("Please provide a valid search input.");
      return;
    }
    const trimmedQuery = searchValue.trim();

    let fetchUrl = "";
    let getUrl = "";
    if (searchType === "username") {
      fetchUrl = `${API_BASE}/fetch/username/${trimmedQuery}`;
      getUrl = `${API_BASE}/tweets/username/${trimmedQuery}`;
    } else if (searchType === "hashtag") {
      fetchUrl = `${API_BASE}/fetch/hashtag/${trimmedQuery}`;
      getUrl = `${API_BASE}/tweets/hashtag/${trimmedQuery}`;
    } else if (searchType === "id") {
      fetchUrl = `${API_BASE}/fetch/id/${trimmedQuery}`;
      getUrl = `${API_BASE}/tweets/id/${trimmedQuery}`;
    }

    setLoading(true);

    try {
      // First: fetch real tweets and analyze them in backend + store to DB
      await axios.post(fetchUrl);
      // Second: retrieve analyzed tweets from DB
      const response = await axios.get(getUrl);
      const tweetData = Array.isArray(response.data) ? response.data : [response.data];
      setTweets(tweetData);
      setTopKeywords(extractTopKeywords(tweetData));
      setDashboardVisible(true); // Show dashboard on success
    } catch (err) {
      console.error("Error fetching tweets:", err);
      // If the fetch POST or GET fails, reset the state
      setTweets([]);
      setTopKeywords([]);
      setDashboardVisible(false);
      if (err.response && err.response.data && err.response.data.detail) {
        alert("Failed: " + err.response.data.detail);
      } else {
        alert("Failed to fetch tweets. Please check the input and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <SearchBY onSearch={handleSearchTrigger} loading={loading} />

      {/* Instruction/Prompt */}
      {!dashboardVisible && (
        <div style={{
          textAlign: "center",
          marginTop: 64,
          color: "#6b7280",
          fontSize: 18,
          fontWeight: 500
        }}>
          Please enter a search above to analyze tweet sentiments.
        </div>
      )}

      {/* Dashboard content - hidden until tweets are fetched and analyzed */}
      {dashboardVisible && (
        <Container className="main-container" sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "block",
              borderRadius: 4,
              boxShadow: 6,
              p: 3,
              background:
                "linear-gradient(to top left, rgba(173, 216, 230, 0.2), rgba(255, 255, 255, 0.7))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255, 255, 255, 0.3)",
              overflow: "hidden",
              pt: 5,
              mb: 4,
            }}
          >
            {/* Info Cards */}
            <Box sx={{ display: "flex", flexDirection: "row", gap: 7, mb: 5, ml: 5 }}>
              <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2, maxWidth: 300, flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TwitterIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6" gutterBottom>
                    Tweets Analyzed
                  </Typography>
                </Box>
                <Typography variant="body1">Total fetched tweets: {tweets.length}</Typography>
              </Box>
              <Box
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  maxWidth: 300,
                  flex: 1,
                  cursor: "pointer",
                }}
                onClick={() => setShowTweetsPopup(true)}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AutoAwesomeIcon sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="h6" gutterBottom>
                    Sentiment Overview
                  </Typography>
                </Box>
                <Typography variant="body1">Click to view fetched tweets</Typography>
              </Box>
              <Box
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  maxWidth: 300,
                  flex: 1,
                  cursor: "pointer",
                }}
                onClick={() => setShowKeywordsPopup(true)}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TimelineIcon sx={{ mr: 1, color: "info.main" }} />
                  <Typography variant="h6" gutterBottom>
                    Top Keywords
                  </Typography>
                </Box>
                <Typography variant="body1">Click to view ranked keywords</Typography>
              </Box>
            </Box>

            <Box display="flex" justifyContent="center" width="100%">
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={4}
                maxWidth={1200}
                width="100%"
                margin="0 auto"
                mb={4}
              >
                <Box
                  gridColumn="span 6"
                  p={3}
                  borderRadius={3}
                  bgcolor="#fff"
                  boxShadow={2}
                  sx={{ display: "flex", alignItems: "center", height: "100%" }}
                >
                  <SwitchSeriesType tweets={tweets} />
                </Box>
                <Box
                  gridColumn="span 6"
                  p={3}
                  borderRadius={3}
                  bgcolor="#fff"
                  boxShadow={2}
                  sx={{ display: "flex", alignItems: "center", height: "100%" }}
                >
                  <Chat1 tweets={tweets} />
                </Box>
                <Box
                  gridColumn="span 12"
                  sx={{ mt: 3 }}
                  p={3}
                  display="flex"
                  alignItems="center"
                >
                  <HeatmapImage tweets={tweets} />
                </Box>
                <Box
                  gridColumn="span 12"
                  display="flex"
                  alignItems="center"
                >
                  <WordCloudImage tweets={tweets} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      )}

      {/* Tweets Modal */}
      <Modal open={showTweetsPopup} onClose={() => setShowTweetsPopup(false)}>
        <Fade in={showTweetsPopup}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Fetched Tweets
            </Typography>
            {tweets.map((tweet, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="subtitle2">@{tweet.username}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {tweet.content}
                </Typography>
                {/* Show predicted sentiment if present */}
                {(tweet.predicted_sentiment || tweet.sentiment) && (
                  <Typography variant="caption" color="primary">
                    Sentiment: {tweet.predicted_sentiment || tweet.sentiment}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                  {tweet.date}
                </Typography>
              </Box>
            ))}
          </Box>
        </Fade>
      </Modal>

      {/* Keyword Modal */}
      <Modal open={showKeywordsPopup} onClose={() => setShowKeywordsPopup(false)}>
        <Fade in={showKeywordsPopup}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              maxHeight: "80vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Top Keywords (Ranked)
            </Typography>
            {topKeywords.length > 0 ? (
              topKeywords.map((kw, idx) => (
                <Typography key={idx} variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                  #{idx + 1}: {kw.word} ({kw.count} times)
                </Typography>
              ))
            ) : (
              <Typography>No keywords available.</Typography>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Footer */}
      {dashboardVisible && tweets && tweets.length > 0 && <Footer />}
    </>
  );
}
export default App;
