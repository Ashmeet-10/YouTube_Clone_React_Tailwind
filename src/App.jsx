import { useState } from 'react'
import './App.css'
import { Navbar, Sidebar } from './components'

function App() {
  const[sidebar, setSidebar] = useState('-translate-x-full')

  return (
    <div className="">
      <Navbar setSidebar={setSidebar} />
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
    </div>
  )
}

export default App
