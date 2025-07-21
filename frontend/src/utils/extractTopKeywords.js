const stopwords = new Set([
  "the", "is", "in", "and", "to", "of", "a", "for", "on", "with", "at", "by", "from", "an", "this", "that",
  "it", "are", "as", "be", "was", "were", "will", "can", "has", "have", "you", "i", "we", "they", "them",
  "he", "she", "my", "your", "but", "if", "or", "so", "do", "just", "not", 'like', 'all', 'about',
  "there", "what", "when", "where", "who", "why", "how", "more", "some", "such", "than", "other", "its", "no", "yes", "up", "down", "out", "into",
  "over", "under", "after", "before", "then", "now", "get", "got", "gotten", "make", "made", "see", "saw", "say", "said", "go", "went", "come", "came", "its", "now",
  "take", "took", "look", "looks",
  "thing", "things", "way", "ways",
  "part", "parts", "back", "front", "side", "sides", "end", "ends", "start", "starts", "case", "cases",
  "point"
]);

export function extractTopKeywords(tweets, topN = 10) {
  if (!Array.isArray(tweets)) return [];

  const wordFreq = {};

  tweets.forEach((tweet) => {
    if (!tweet || !tweet.content) return;

    const words = tweet.content
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, "")  // remove URLs
      .replace(/[@#]\w+/g, "")         // remove mentions and hashtags
      .replace(/[^\w\s]/g, "")         // remove punctuation
      .split(/\s+/);                   // split into words

    words.forEach((word) => {
      if (word.length > 2 && !stopwords.has(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
  });

  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word, count]) => ({ word, count }));
}
