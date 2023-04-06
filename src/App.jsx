import { useState } from 'react'
import './App.css'
import { Navbar, Sidebar, Videos, VideoDetail, ChannelDetail, ShortsCard, PlaylistVideos } from './components'
import { Home, ChannelVideos, Shorts, Playlists, About, CommunityPosts, FeaturedChannels } from './components/ChannelDetailRoutes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const [sidebar, setSidebar] = useState('-translate-x-full')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSuggCat, setSelectedSuggCat] = useState('All')
  const [searchKey, setSearchKey] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3 * 60 * 1000
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#0f0f0f] min-h-[100vh]">
        <BrowserRouter>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} setSelectedCategory={setSelectedCategory} />
          <Routes>
            <Route exact path='/' element={
              <>
                <Navbar setSidebar={setSidebar} selectedSuggCat={selectedSuggCat} setSelectedSuggCat={setSelectedSuggCat} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} searchKey={searchKey} setSearchKey={setSearchKey} setShowSearchResults={setShowSearchResults} />
                
                <Videos selectedSuggCat={selectedSuggCat} selectedCategory={selectedCategory} searchKey={searchKey} showSearchResults={showSearchResults} />
              </>
            } />

            <Route exact path='/video/:id' element={<VideoDetail />} />
            <Route exact path='/shorts/:id' element={<ShortsCard />} />
            <Route exact path='/playlist/:id' element={<PlaylistVideos />} />
            <Route path='/channel/:id' element={<ChannelDetail />}>
              <Route index element={<Home />} />
              <Route path='/channel/:id/videos' element={<ChannelVideos />} />
              <Route path='/channel/:id/shorts' element={<Shorts />} />
              <Route path='/channel/:id/playlists' element={<Playlists />} />
              <Route path='/channel/:id/channels' element={<FeaturedChannels />} />
              <Route path='/channel/:id/community' element={<CommunityPosts />} />
              <Route path='/channel/:id/about' element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App