import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchTweetsByUsername = async (username) => {
  const response = await axios.post(`${API_URL}/fetch/username/${username}`, {});
  return ;
};

export const getTweetsByUsername = async (username) => {
  const response = await axios.get(`${API_URL}/tweets/username/${username}`);
  return response.data;
};
export const fetchTweetsByTweetId = async (tweetId) => {
  const response = await axios.post(`${API_URL}/fetch/tweet/${tweetId}`);
  return ;
};

export const getTweetsByTweetId = async (tweetId) => {
  const response = await axios.get(`${API_URL}/tweets/tweet/${tweetId}`);
  return response.data;
};

export const fetchTweetsByHashtag = async (hashtag) => {
  const response = await axios.post(`${API_URL}/fetch/hashtag/${hashtag}`);
  return ;
};

export const getTweetsByHashtag = async (hashtag) => {
  const response = await axios.get(`${API_URL}/tweets/hashtag/${hashtag}`);
  return response.data;
};