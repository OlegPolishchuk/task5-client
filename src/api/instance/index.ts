import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_API_BASE_URL || 'http://localhost:5000',
})