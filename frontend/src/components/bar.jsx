import * as React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import {
  ChartContainer,
  BarPlot,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsLegend,
  ChartsTooltip,
} from "@mui/x-charts";

// Helper: aggregate likes+retweets by sentiment
function aggregateTotalEngagementBySentiment(tweets) {
  const groups = { Positive: 0, Neutral: 0, Negative: 0 };
  tweets.forEach(tweet => {
    if (tweet.sentiment && (tweet.likes != null || tweet.retweets != null)) {
      const sentiment = tweet.sentiment.toLowerCase();
      const likes = Number(tweet.likes) || 0;
      const retweets = Number(tweet.retweets) || 0;
      if (sentiment === "positive") groups.Positive += likes + retweets;
      else if (sentiment === "neutral") groups.Neutral += likes + retweets;
      else if (sentiment === "negative") groups.Negative += likes + retweets;
    }
  });
  return [
    { sentiment: "Positive", value: groups.Positive },
    { sentiment: "Neutral", value: groups.Neutral },
    { sentiment: "Negative", value: groups.Negative },
  ];
}

export default function SentimentEngagementBarChart({ tweets = [] }) {
  const [type, setType] = React.useState("bar");
  const data = React.useMemo(
    () => aggregateTotalEngagementBySentiment(tweets),
    [tweets]
  );

  // Each series gets one color
  const sentimentSeries = [
    {
      type,
      label: "Positive",
      data: [data.find(d => d.sentiment === "Positive")?.value || 0],
      color: "#6366F1",
    },
    {
      type,
      label: "Neutral",
      data: [data.find(d => d.sentiment === "Neutral")?.value || 0],
      color: "#C084FC",
    },
    {
      type,
      label: "Negative",
      data: [data.find(d => d.sentiment === "Negative")?.value || 0],
      color: "#F472B6",
    },
  ];

  return (
    <Box className="p-6 w-full max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Total Engagement by Sentiment
        </h2>
        <p className="text-sm text-gray-500">
          Sum of likes and retweets for each sentiment
        </p>
      </div>
      <div className="flex justify-end mb-4">
        <TextField
          select
          size="small"
          label="Chart Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="bar">Bar</MenuItem>
          <MenuItem value="line">Line</MenuItem>
        </TextField>
      </div>
      <ChartContainer
        height={300}
        xAxis={[
          {
            id: "x-axis",
            data: ["Sentiment"], // Single group label, as each series is a sentiment
            scaleType: "band",
            label: "Sentiment"
          },
        ]}
        yAxis={[
          { label: "Likes + Retweets" },
        ]}
        series={sentimentSeries}
        margin={{ top: 20, bottom: 50, left: 50, right: 20 }}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis axisId="x-axis" />
        <ChartsYAxis />
        <ChartsTooltip />
        <ChartsLegend />
      </ChartContainer>
    </Box>
  );
}
