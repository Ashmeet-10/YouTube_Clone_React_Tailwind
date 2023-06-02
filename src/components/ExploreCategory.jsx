import React from 'react'
import { Loading, Videos } from './'
import useSearch from '../hooks/useSearch'
import useTrendingVideos from '../hooks/useTrendingVideos'

const ExploreCategory = (props) => {
  const { selectedCategory } = props
  const { data, isError, isLoading, isFetching } = useSearch(selectedCategory)
  const TrendingVideos = useTrendingVideos()

  if (selectedCategory === 'Trending' ? TrendingVideos.isLoading : isLoading) {
    return (<Loading classes="items-center h-[70vh]" />)
  }

  if (isError || TrendingVideos.isError) {
    return <span>Error</span>
  }

  let videos = selectedCategory === 'Trending' ? TrendingVideos?.data.data : data?.data

  return (
    <div>
      <Videos videos={videos} />
    </div>
  )
}

export default ExploreCategory
