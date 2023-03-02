export const BASE_URL = 'https://yt-api.p.rapidapi.com'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8a99a996abmsh7927b9c37048e01p11c708jsn1a4f812d1911',
		'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
	}
};

export const fetchFromAPI = async(url)=>{
    const response = await fetch(`${BASE_URL}/${url}`, options)
    const data = await response.json()
    return data
}