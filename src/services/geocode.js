import axios from 'axios';

const API_URL = 'https://nominatim.openstreetmap.org/reverse';
const API_KEY = '6749234d2a6b8817059692slic87c2d';

const geocode = async (lat, lon) => {
	try {
		const res = await axios.get(`${API_URL}?lat=${lat}&lon=${lon}&format=json`);
		return res.data.address.road;
	} catch(error) {
		return 'Fetching error';
	}
}

export default geocode;
