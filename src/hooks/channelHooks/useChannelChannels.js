import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelChannels = async (channelId) => {
    const response = await fetchData(`channel/channels?id=${channelId}`)
    return response
}

export default function useChannelChannels(channelId) {
    return useQuery({
        queryKey: ['channel', channelId, 'channels'],
        queryFn: fetchChannelChannels(channelId),
    })
}