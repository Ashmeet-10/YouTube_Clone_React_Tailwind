import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchVideoInfo = async (videoId) => {
    const response = await fetchData(`video/info?id=${videoId}`)
    return response
}

export default function useVideoInfo(videoId, enabled=true) {
    return useQuery({
        queryKey: ['video', videoId],
        queryFn: () => fetchVideoInfo(videoId),
        enabled: enabled
    })
}