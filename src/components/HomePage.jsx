import React from 'react'
import { Loading, Videos } from './'
import useSearch from '../hooks/useSearch'
import useHomeFeed from '../hooks/useHomeFeed'

const HomePage = (props) => {
  const { selectedSuggCat } = props
  const { data, isError, isLoading, isFetching } = useSearch(selectedSuggCat)
  const HomeFeed = useHomeFeed()
  
  if(selectedSuggCat==='All' ? HomeFeed.isLoading : isLoading) {
    return (<Loading classes="items-center h-[70vh]" />)
  }
  
  if(isError || HomeFeed.isError) {
    return <span>Error</span>
  }

  let videos = selectedSuggCat==='All' ? HomeFeed?.data.data : data?.data

  console.log(videos)

  return (
    <div>
      <Videos videos={videos} />
    </div>
  )
}

export default HomePage
