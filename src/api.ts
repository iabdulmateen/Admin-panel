import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:4000/api', // 👈 127.0.0.1 IPv4 connection refusal bypass karta hai
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;