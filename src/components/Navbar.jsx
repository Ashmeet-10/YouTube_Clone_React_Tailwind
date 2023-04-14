import React, { useEffect, useState } from 'react'
import Youtube_icon from '../assets/Youtube_icon.svg'
import { suggestedCategories } from '../utils/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import useChannelAbout from '../hooks/channelHooks/useChannelAbout'
import usePlaylistInfo from '../hooks/usePlaylistInfo'

const SuggestedCategories = (props) => {
  const { setSidebar, selectedSuggCat, setSelectedSuggCat } = props
  return (
    <div className="Suggested-titles bg-[#0f0f0f] text-white h-12 flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none]">
      <div className="flex items-center px-3 py-1 border-gray-700 border-r-[1px]">
        <span onClick={() => setSidebar('translate-x-0')} className='flex items-center bg-[#272727] px-3 py-1 rounded-lg cursor-pointer opacity-90'>
          <i className="fa-regular fa-compass mr-2"></i> Explore
        </span>
      </div>
      <div className="mx-3 flex items-center break-keep space-x-3 overscroll-auto">
        {suggestedCategories.map((item) => (
          <span key={item.key} onClick={() => { setSelectedSuggCat(() => item.value) }} className={`${selectedSuggCat === item.value ? 'bg-white text-black' : 'bg-[#272727] text-white'} whitespace-nowrap px-3 py-1 rounded-lg opacity-90 cursor-pointer hover:bg-[#383838] duration-200 ease-in-out`}>{item.value}</span>
        ))}
      </div>
    </div>
  )
}

const Navbar = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const channelRegex = new RegExp('/channel/')
  const videoRegex = new RegExp('/video/')
  const playlistRegex = new RegExp('/playlist/')
  const channelInfo = useChannelAbout(props.id, channelRegex.test(location.pathname))
  const playlistInfo = usePlaylistInfo(props.id, playlistRegex.test(location.pathname))

  const { selectedCategory, setSelectedCategory, searchKey, setSearchKey, setShowSearchResults } = props
  const [hideSuggCat, setHideSuggCat] = useState(searchKey !== '' ? true : false)
  const [showSearchBar, setShowSearchBar] = useState(searchKey !== '' ? true : false)

  useEffect(() => {
    if (channelRegex.test(location.pathname) || videoRegex.test(location.pathname) || playlistRegex.test(location.pathname)) {
      setShowSearchBar(false)
      setHideSuggCat(true)
    }
    else{
      setHideSuggCat(false)
    }
  }, [location.pathname])

  const handleSearchClick = () => {
    if (searchKey !== '') {
      props.setSearchQuery(() => searchKey)
      setHideSuggCat(true)
      setShowSearchResults(() => true)
    }
  }

  const open_search_bar = () => {
    setShowSearchBar(true)
    setHideSuggCat(true)
  }
  const close_search_bar = () => {
    if(!channelRegex.test(location.pathname) && !videoRegex.test(location.pathname) && !playlistRegex.test(location.pathname)){
      setHideSuggCat(false)
    }
    setShowSearchBar(false)
    setSearchKey('')
    setShowSearchResults(() => false)
  }

  return (
    <div className='bg-[#0f0f0f] sticky top-0 left-0 z-20'>
      <div id="nav_part_1_1" className={`flex items-center justify-between h-12 pl-2 pr-6 border-gray-700 border-b-[1px] lg:hidden ${showSearchBar ? 'hidden' : ''}`}>
        {selectedCategory === '' ? <div className="flex items-center">
          <img onClick={() => {
            navigate("/")
            setShowSearchBar(false)
            setHideSuggCat(false)
            setSearchKey('')
            setShowSearchResults(() => false)
          }}
            src={Youtube_icon} width="35px" height="35px" alt="" className='inline cursor-pointer'
          />
          {!channelRegex.test(location.pathname) && !playlistRegex.test(location.pathname) && <span className='text-white text-2xl font-semibold -tracking-[1px]'>YouTube</span>}
          {channelInfo.isFetched && channelRegex.test(location.pathname) && <span className='text-white font-semibold ml-4'>{channelInfo && channelInfo.data.title}</span>}
          {playlistInfo.isFetched && playlistRegex.test(location.pathname) && <span className='text-white font-semibold ml-4 line-clamp-1'>{playlistInfo && playlistInfo.data.meta.title}</span>}
        </div>
          : <div className="flex items-center text-white">
            <i onClick={() => setSelectedCategory('')}
              className={'fa-solid fa-arrow-left-long text-xl mr-4 cursor-pointer'}
            >
            </i>
            <span className='text-xl font-semibold'>{selectedCategory}</span>
          </div>}
        <div className="search">
          <button type='button' onClick={open_search_bar} >
            <i className="fa-solid fa-magnifying-glass text-white opacity-80"></i>
          </button>
        </div>
      </div>

      <div id="nav_part_1_2" className={`lg:hidden ${showSearchBar ? '' : 'hidden'}`}>
        <div className="h-12 flex items-center justify-between px-4 bg-[#212121] border-gray-700 border-b-[1px]">
          <button type='button' onClick={close_search_bar}>
            <i className="fa-solid fa-arrow-left text-white text-2xl opacity-80"></i>
          </button>
          <div className="search-bar flex justify-between w-4/5 rounded-2xl bg-[#383838] overflow-hidden p-1 px-4">
            <input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className='w-5/6 text-white bg-[#383838] focus:outline-none' placeholder='Search YouTube' />
            <button type='button'>
              <i onClick={handleSearchClick} className="fa-solid fa-magnifying-glass text-white opacity-80"></i>
            </button>
          </div>
          <button type='button' className="">
            <i className="fa-solid fa-microphone flex justify-center items-center text-white opacity-80 bg-[#383838] rounded-full w-8 h-8"></i>
          </button>
        </div>
      </div>
      {selectedCategory === '' && hideSuggCat === false && <div className="lg:hidden">
        <SuggestedCategories {...props} />
      </div>}



      {/* Navbar for larger screens */}
      <div id="nav_part_2" className='hidden lg:block'>
        <div className="h-16 flex items-center justify-between px-6 bg-[#0f0f0f] border-gray-700 border-b-[1px] lg:border-0">
          <div className="flex items-center space-x-4">
            <button type='button' onClick={close_search_bar}>
              <i className="fa-solid fa-bars text-white text-2xl opacity-80"></i>
            </button>
            <div className="flex items-center">
              <img src={Youtube_icon} onClick={()=>navigate('/')} width="35px" height="35px" alt="" className='inline cursor-pointer' />
              <span className='text-white text-2xl font-semibold -tracking-[1px] '>YouTube</span>
            </div>
          </div>
          <div className="search-bar h-10 flex justify-between w-1/2 rounded-3xl bg-[#121212] overflow-hidden p-1 px-4 border border-gray-700">
            <input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className='w-5/6 text-white bg-[#121212] focus:outline-none' placeholder='Search YouTube' />
            <button type='button'>
              <i onClick={handleSearchClick} className="fa-solid fa-magnifying-glass text-white opacity-80"></i>
            </button>
          </div>
          <button type='button' className="">
            <i className="fa-solid fa-microphone flex justify-center items-center text-white opacity-80 bg-[#383838] rounded-full w-8 h-8"></i>
          </button>
        </div>
      </div>
      {!channelRegex.test(location.pathname) && !videoRegex.test(location.pathname) && !playlistRegex.test(location.pathname) && <div className="hidden lg:block">
        {selectedCategory === '' && <SuggestedCategories {...props} />}
      </div>}



    </div>
  )
}

export default Navbar
