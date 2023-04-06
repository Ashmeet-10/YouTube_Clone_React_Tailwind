import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchComments = async (videoId) => {
    const response = await fetchData(`comments?id=${videoId}`)
    return response
}

export default function useComments(videoId) {
    return useQuery({
        queryKey: ['comments', videoId],
        queryFn: () => fetchComments(videoId),
    })
}