import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelPosts = async (channelId) => {
    const response = await fetchData(`channel/community?id=${channelId}`)
    return response
}

export default function useChannelPosts(channelId) {
    return useQuery({
        queryKey: ['channel', channelId, 'posts'],
        queryFn: fetchChannelPosts(channelId),
    })
}