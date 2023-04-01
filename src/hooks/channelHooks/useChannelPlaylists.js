import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelPlaylists = async (channelId) => {
    const response = await fetchData(`channel/playlists?id=${channelId}`)
    return response
}

export default function useChannelPlaylists(channelId) {
    return useQuery({
        queryKey: ['channel', channelId, 'playlists'],
        queryFn: fetchChannelPlaylists(channelId),
    })
}