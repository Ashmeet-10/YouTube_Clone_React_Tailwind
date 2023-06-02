import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchPost = async (postId) => {
    const response = await fetchData(`post/info?id=${postId}`)
    return response
}

export default function usePost(postId) {
    return useQuery({
        queryKey: [postId, 'post'],
        queryFn: () => fetchPost(postId),
    })
}