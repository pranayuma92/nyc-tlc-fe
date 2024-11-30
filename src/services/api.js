import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL;

const payload = {
    "dropOffTime": "",
    "pickUpTime": "",
    "fareAmount": "",
    "distance": "",
    "paymentType": "",
    "sort": "",
    "limit": 9999,
    "offset": 0
}

export const getTrips = async (filters) => {
  try {
    const { data } = await axios.post(`${API_URL}/trip`, payload);
    return data.data;
  } catch (error) {
    console.error('Error fetching trips', error);
  }
};