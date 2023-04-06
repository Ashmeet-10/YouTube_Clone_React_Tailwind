import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchPostComments = async (postId) => {
    const response = await fetchData(`post/comments?id=${postId}`)
    return response
}

export default function usePostComments(postId) {
    return useQuery({
        queryKey: ['postComments', postId],
        queryFn: () => fetchPostComments(postId),
    })
}