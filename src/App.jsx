import { useState } from 'react'
import './App.css'
import { Navbar, Sidebar, Videos, VideoDetail, ChannelDetail, ShortsCard, PlaylistVideos } from './components'
import { Home, ChannelVideos, Shorts, Playlists, About, CommunityPosts, FeaturedChannels } from './components/ChannelDetailRoutes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [videos, setVideos] = useState([])
  const [sidebar, setSidebar] = useState('-translate-x-full')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSuggCat, setSelectedSuggCat] = useState('All')

  return (
    <div className="bg-[#0f0f0f] min-h-[100vh]">
      <BrowserRouter>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} setVideos={setVideos} setSelectedCategory={setSelectedCategory} />
        <Routes>
          <Route exact path='/' element={
            <>
              <Navbar setSidebar={setSidebar} setVideos={setVideos} selectedSuggCat={selectedSuggCat} setSelectedSuggCat={setSelectedSuggCat} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <Videos videos={videos} setVideos={setVideos} selectedSuggCat={selectedSuggCat} selectedCategory={selectedCategory} />
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
  )
}

export default App
