import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelAbout = async (channelId) => {
    const response = await fetchData(`channel/about?id=${channelId}`)
    return response
}

export default function useChannelAbout(channelId) {
    return useQuery({
        queryKey: ['channel', channelId, 'about'],
        queryFn: fetchChannelAbout(channelId),
    })
}