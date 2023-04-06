import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchTrendingVideos = async () => {
    const response = await fetchData(`trending?geo=IN&type=now`)
    return response
}

export default function useTrendingVideos() {
    return useQuery({
        queryKey: ['TrendingVideos'],
        queryFn: fetchTrendingVideos,
    })
}