import { useState } from 'react'
import './App.css'
import { Navbar, Sidebar, VideoDetail, ChannelDetail, ShortsCard, PlaylistVideos, HomePage, SearchResults, ExploreCategory, SuggestedCategories, SingleCommunityPost } from './components'
import { Home, ChannelVideos, Shorts, Playlists, About, CommunityPosts, FeaturedChannels } from './components/ChannelDetailRoutes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

function App() {
  const [sidebar, setSidebar] = useState('-translate-x-full')
  const [selectedCategory, setSelectedCategory] = useState('Home')
  const [selectedSuggCat, setSelectedSuggCat] = useState('All')
  const [searchKey, setSearchKey] = useState('')
  const [expandLgScreenSidebar, setExpandLgScreenSidebar] = useState(true)
  const [id, setId] = useState('')
  const [hideSuggCat, setHideSuggCat] = useState(false)
  
  const updateId = (id) => {
    setId(() => id)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="bg-[#0f0f0f] min-h-[100vh]">
          <Navbar searchKey={searchKey} setSearchKey={setSearchKey} id={id} expandLgScreenSidebar={expandLgScreenSidebar} setExpandLgScreenSidebar={setExpandLgScreenSidebar} setHideSuggCat={setHideSuggCat} />
          <div className="lg:flex">
            <div className={`lg:relative ${expandLgScreenSidebar ? 'lg:w-56 xl:w-60 min-[1400px]:w-64 2xl:w-[17rem] 3xl:w-72' : 'w-20'} `}>
              <Sidebar sidebar={sidebar} setSidebar={setSidebar} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} expandLgScreenSidebar={expandLgScreenSidebar} />
            </div>
            <div className="mx-auto relative lg:w-[calc(100vw-15rem)] xl:w-[calc(100vw-16rem)] min-[1400px]:w-[calc(100vw-17rem)] 2xl:w-[calc(100vw-18rem)] 3xl:w-[calc(100vw-19rem)]">
              {!hideSuggCat && <div className="sticky overflow-x-hidden top-12 lg:top-16 z-10">
                <SuggestedCategories setSidebar={setSidebar} selectedSuggCat={selectedSuggCat} setSelectedSuggCat={setSelectedSuggCat} />
              </div>}
              
              <Routes>
                <Route exact path='/' element={<HomePage selectedSuggCat={selectedSuggCat} />} />

                <Route exact path='/Results/:searchQuery' element={<SearchResults />} />
                <Route exact path='/explore' element={<ExploreCategory selectedCategory={selectedCategory} />} />
                <Route exact path='/video/:id' element={<VideoDetail />} />
                <Route exact path='/shorts/:id' element={<ShortsCard />} />
                <Route exact path='/playlist/:id' element={<PlaylistVideos updateId={updateId} />} />
                <Route path='/post/:id' element={<SingleCommunityPost />} />

                <Route path='/channel/:id' element={<ChannelDetail updateId={updateId} />}>
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