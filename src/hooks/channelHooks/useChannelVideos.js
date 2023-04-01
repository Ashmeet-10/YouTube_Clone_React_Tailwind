import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelVideos = async (channelId) => {
    const response = await fetchData(`channel/videos?id=${channelId}`)
    return response
}

export default function useChannelVideos(channelId) {
    return useQuery({
        queryKey: ['channel', channelId, 'videos'],
        queryFn: fetchChannelVideos(channelId),
    })
}