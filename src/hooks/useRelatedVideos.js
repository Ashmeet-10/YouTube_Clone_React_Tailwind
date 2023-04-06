import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchRelatedVideos = async (videoId) => {
    const response = await fetchData(`related?id=${videoId}`)
    return response
}

export default function useRelatedVideos(videoId, enabled=true) {
    return useQuery({
        queryKey: ['RelatedVideos', videoId],
        queryFn: () => fetchRelatedVideos(videoId),
        enabled: enabled,
    })
}