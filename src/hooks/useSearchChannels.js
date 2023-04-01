import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchChannelSearchResults = async (searchKey) => {
    const response = await fetchData(`search?query=${searchKey}&type=channel`)
    return response
}

export default function useSearchChannels(searchKey) {
    return useQuery({
        queryKey: ['search', searchKey, 'channels'],
        queryFn: fetchChannelSearchResults(searchKey),
    })
}