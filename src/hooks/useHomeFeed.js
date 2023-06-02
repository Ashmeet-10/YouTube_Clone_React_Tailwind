import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchHomeFeed = async () => {
    const response = await fetchData(`home`)
    return response
}

export default function useHomeFeed() {
    return useQuery({
        queryKey: ['homeFeed'],
        queryFn: () => fetchHomeFeed(),
    })
}