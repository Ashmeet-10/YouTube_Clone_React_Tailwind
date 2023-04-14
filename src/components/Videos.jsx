import React from 'react'
import { Loading, PlaylistCard, VideoCard, ChannelCard } from './'
import useSearch from '../hooks/useSearch'
import useTrendingVideos from '../hooks/useTrendingVideos'
import useRelatedVideos from '../hooks/useRelatedVideos'
import useSearchChannels from '../hooks/useSearchChannels'
import useSearchPlaylists from '../hooks/useSearchPlaylists'

const Videos = (props) => {
  const { selectedSuggCat, relatedVideoId, selectedCategory, showSearchResults, searchQuery } = props
  let videos = []
  let related = false
  if (typeof (relatedVideoId) !== 'undefined') {
    related = true
  }
  const videoSearch = useSearch(searchQuery, showSearchResults)
  const channelSearch = useSearchChannels(searchQuery, showSearchResults)
  const playlistSearch = useSearchPlaylists(searchQuery, showSearchResults)
  const { data: videos1, isError: isError1, isLoading: isLoading1, isFetching: isFetching1 } = useSearch(selectedSuggCat, (selectedCategory === '' && !related && !showSearchResults))
  const { data: videos2, isError: isError2, isLoading: isLoading2, isFetching: isFetching2 } = useSearch(selectedCategory, (selectedCategory !== '' && !related && !showSearchResults))
  const { data: videos3, isError: isError3, isLoading: isLoading3, isFetching: isFetching3 } = useRelatedVideos(relatedVideoId, related && !showSearchResults)

  if (!showSearchResults && (isLoading1 && isFetching1) || (isLoading2 && isFetching2) || (isLoading3 && isFetching3)) {
    return (<Loading classes="items-center h-[70vh]" />)
  }
  if (showSearchResults && (videoSearch.isLoading || channelSearch.isLoading || playlistSearch.isLoading)) {
    return (<Loading classes="items-center h-[70vh]" />)
  }

  if (isError1 || isError2 || isError3) {
    return <span>Error</span>
  }

  if (showSearchResults) {
    videos = [...videoSearch.data.data, ...playlistSearch.data.data]
  }

  else if (selectedCategory === '' && !related && !showSearchResults) {
    videos = videos1.data
  }
  else if (selectedCategory !== '' && !related && !showSearchResults) {
    videos = videos2.data
  }
  else if (related && !showSearchResults) {
    videos = videos3.data
  }

  return (
    <div className={`py-4 flex flex-col xs:grid xs:gap-4 xs:grid-cols-2 min-[860px]:grid-cols-3 ${relatedVideoId?'lg:grid-cols-1':'lg:grid-cols-4 3xl:grid-cols-5 xs:px-2'}`}>
      {videos.map((video, idx) => (
        <div key={idx}>
          {video.type === 'video' && <VideoCard {...video} relatedVideoId={relatedVideoId} />}
          {video.type === 'channel' && <ChannelCard {...video} />}
          {video.type === 'playlist' && <PlaylistCard {...video} search="true" relatedVideoId={relatedVideoId} />}
        </div>
      ))}
    </div>
  )
}

export default Videos
