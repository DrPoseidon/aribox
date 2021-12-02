import axios from 'axios';
export const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default  api;
