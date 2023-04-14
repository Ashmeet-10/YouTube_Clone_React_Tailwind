import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelAbout = async (channelId) => {
    console.log(channelId)
    const response = await fetchData(`channel/about?id=${channelId}`)
    return response
}

export default function useChannelAbout(channelId, enabled = true) {
    return useQuery({
        queryKey: ['channel', channelId, 'about'],
        queryFn: () => fetchChannelAbout(channelId),
        enabled: enabled,
    })
}