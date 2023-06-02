import React from 'react'
import { Loading, Videos } from './'
import useSearch from '../hooks/useSearch'
import useSearchChannels from '../hooks/useSearchChannels'
import useSearchPlaylists from '../hooks/useSearchPlaylists'
import { useParams } from 'react-router-dom'

const SearchResults = () => {
  const { searchQuery } = useParams()
  const videoSearch = useSearch(searchQuery)
  const channelSearch = useSearchChannels(searchQuery)
  const playlistSearch = useSearchPlaylists(searchQuery)

  if (videoSearch.isLoading || channelSearch.isLoading || playlistSearch.isLoading) {
    return (<Loading classes="items-center h-[70vh]" />)
  }

  if (videoSearch.isError || channelSearch.isError || playlistSearch.isError) {
    return <span>Error</span>
  }

  return (
    <div>
      <Videos videos={[...videoSearch.data.data, ...playlistSearch.data.data,]} />
    </div>
  )
}

export default SearchResults
