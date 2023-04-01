import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchFromAPI";

export const fetchSearchResults = async (searchKey) => {
    const response = await fetchData(`search?query=${searchKey}`)
    return response
}

export default function useSearch(searchKey) {
    return useQuery({
        queryKey: ['search', searchKey],
        queryFn: fetchSearchResults(searchKey),
    })
}