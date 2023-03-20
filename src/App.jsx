import { useState } from 'react'
import './App.css'
import { Navbar, Sidebar, Videos, VideoDetail } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [videos, setVideos] = useState([])
  const [sidebar, setSidebar] = useState('-translate-x-full')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSuggCat, setSelectedSuggCat] = useState('All')

  return (
    <div className="">
      <BrowserRouter>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} setVideos={setVideos} setSelectedCategory={setSelectedCategory} />
        <Routes>
          <Route exact path='/' element={
            <>
              <Navbar setSidebar={setSidebar} setVideos={setVideos} selectedSuggCat={selectedSuggCat} setSelectedSuggCat={setSelectedSuggCat} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <Videos videos={videos} setVideos={setVideos} selectedSuggCat={selectedSuggCat} />
            </>
          } />

          <Route exact path='/video/:id' element={<VideoDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
