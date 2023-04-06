import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelShorts = async (channelId) => {
    const response = await fetchData(`channel/shorts?id=${channelId}`)
    return response
}

export default function useChannelShorts(channelId) {
    return useQuery({
        queryKey: ['channel', channelId, 'shorts'],
        queryFn: () => fetchChannelShorts(channelId),
    })
}