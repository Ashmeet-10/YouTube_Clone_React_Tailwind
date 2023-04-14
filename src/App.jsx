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
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [id, setId] = useState('')

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="bg-[#0f0f0f] min-h-[100vh]">
          <Navbar setSidebar={setSidebar} selectedSuggCat={selectedSuggCat} setSelectedSuggCat={setSelectedSuggCat} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} searchKey={searchKey} setSearchKey={setSearchKey} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setShowSearchResults={setShowSearchResults} id={id} setId={setId} />
          <div className="lg:flex">
            <div className="lg:relative lg:w-56 xl:w-60 min-[1400px]:w-64 2xl:w-[17rem] 3xl:w-72">
              <Sidebar sidebar={sidebar} setSidebar={setSidebar} setSelectedCategory={setSelectedCategory} />
            </div>
            <div className="lg:w-[calc(100vw-14rem)] xl:w-[calc(100vw-15rem)] min-[1400px]:w-[calc(100vw-16rem)] 2xl:w-[calc(100vw-17rem)] 3xl:w-[calc(100vw-18rem)]">
              <Routes>
                <Route exact path='/' element={
                  <Videos selectedSuggCat={selectedSuggCat} selectedCategory={selectedCategory} searchKey={searchKey} searchQuery={searchQuery} showSearchResults={showSearchResults} />
                } />

                <Route exact path='/video/:id' element={<VideoDetail />} />
                <Route exact path='/shorts/:id' element={<ShortsCard />} />
                <Route exact path='/playlist/:id' element={<PlaylistVideos setId={setId} />} />

                <Route path='/channel/:id' element={<ChannelDetail id={id} setId={setId} />}>
                  <Route index element={<Home />} />
                  <Route path='/channel/:id/videos' element={<ChannelVideos />} />
                  <Route path='/channel/:id/shorts' element={<Shorts />} />
                  <Route path='/channel/:id/playlists' element={<Playlists />} />
                  <Route path='/channel/:id/channels' element={<FeaturedChannels />} />
                  <Route path='/channel/:id/community' element={<CommunityPosts />} />
                  <Route path='/channel/:id/about' element={<About />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App