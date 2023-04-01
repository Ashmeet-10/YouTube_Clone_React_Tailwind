import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelHome = async (channelId) => {
    const response = await fetchData(`channel/home?id=${channelId}`)
    return response
}

export default function useChannelHome(channelId) {
    return useQuery({
        queryKey: ['channel', channelId, 'home'],
        queryFn: fetchChannelHome(channelId),
    })
}