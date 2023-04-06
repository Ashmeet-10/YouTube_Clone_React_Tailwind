import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchFromAPI";

export const fetchSearchResults = async (searchKey) => {
    const response = await fetchData(`search?query=${searchKey}`)
    return response
}

export default function useSearch(searchKey, enabled=true) {
    return useQuery({
        queryKey: ['search', searchKey],
        queryFn: () => fetchSearchResults(searchKey),
        enabled: enabled,
    })
}

// write a custom hook to fetch search results by converting the above code into a useInfiniteQuery hook using axios whose query function takes the page param named continuationToken
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { fetchData } from "../utils/fetchFromAPI";

// export const fetchSearchResults = async (searchKey, continuationToken) => {
//     const response = await fetchData(`search?query=${searchKey}&continuation=${continuationToken}`)
//     return response
// }

// export default function useSearch(searchKey, enabled=true) {
//     return useInfiniteQuery({
//         queryKey: ['search', searchKey],
//         queryFn: ({ pageParam='' }) => fetchSearchResults(searchKey, pageParam),
//         enabled: enabled,
//         getNextPageParam: (oldData) => oldData.continuation,
//     })
// }