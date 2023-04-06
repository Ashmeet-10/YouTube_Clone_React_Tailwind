export const BASE_URL = 'https://yt-api.p.rapidapi.com'

import axios from "axios";

const OPTIONS = {
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
		'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
	}
};

export const fetchData = async (url) => {
	const response = await axios.get(`${BASE_URL}/${url}`, OPTIONS)
	return response.data
}