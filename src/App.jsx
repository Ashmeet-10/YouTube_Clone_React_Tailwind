import { Suspense, useState } from 'react'
import './App.css'
import { Navbar, Sidebar, Videos } from './components'

function App() {
  const [videos, setVideos] = useState([])
  const[sidebar, setSidebar] = useState('-translate-x-full')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSuggCat, setSelectedSuggCat] = useState('All')

  return (
    <div className="">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} setVideos={setVideos} setSelectedCategory={setSelectedCategory} />
      <Navbar setSidebar={setSidebar} setVideos={setVideos} selectedSuggCat={selectedSuggCat} setSelectedSuggCat={setSelectedSuggCat} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Videos videos={videos} setVideos={setVideos} selectedSuggCat={selectedSuggCat} />
    </div>
  )
}

export default App
