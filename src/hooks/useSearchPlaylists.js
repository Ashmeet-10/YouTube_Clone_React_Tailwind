import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchPlaylistSearchResults = async (searchKey) => {
    const response = await fetchData(`search?query=${searchKey}&type=playlist`)
    return response
}

export default function useSearchPlaylists(searchKey, enabled=true) {
    return useQuery({
        queryKey: ['search', searchKey, 'playlists'],
        queryFn: () => fetchPlaylistSearchResults(searchKey),
        enabled: enabled,
    })
}