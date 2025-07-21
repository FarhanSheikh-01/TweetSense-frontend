import { parseISO, startOfWeek, format } from "date-fns";

// Utility to process tweets into weekly sentiment counts
export function groupTweetsByWeek(tweets) {
  const weekMap = new Map();

  for (const tweet of tweets) {
    const date = parseISO(tweet.date); // assuming date is in ISO format
    const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday as start of the week
    const weekLabel = format(weekStart, "yyyy-MM-dd");

    if (!weekMap.has(weekLabel)) {
      weekMap.set(weekLabel, { positive: 0, neutral: 0, negative: 0 });
    }

    const sentiment = tweet.sentiment?.toLowerCase();
    if (sentiment === "positive" || sentiment === "neutral" || sentiment === "negative") {
      weekMap.get(weekLabel)[sentiment]++;
    }
  }

  // Convert to array sorted by week
  const sortedWeeks = Array.from(weekMap.entries())
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([label, counts]) => ({ label, ...counts }));

  return sortedWeeks;
}
