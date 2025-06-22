import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getSellerDashboard = (sellerId) => {
  return axios.get(`${API_URL}/api/seller/${sellerId}/dashboard`);
};

export const getSellerTrackRecord = (sellerId) => {
  return axios.get(`${API_URL}/api/seller/${sellerId}/track-record`);
};
