import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchPlaylistInfo = async (playlistId) => {
    const response = await fetchData(`playlist?id=${playlistId}`)
    return response
}

export default function usePlaylistInfo(playlistId) {
    return useQuery({
        queryKey: ['playlistInfo', playlistId],
        queryFn: () => fetchPlaylistInfo(playlistId),
    })
}