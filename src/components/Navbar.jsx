import React, { useRef, useState } from 'react'
import Youtube_icon from '../assets/Youtube_icon.svg'
import { suggestedCategories } from '../utils/constants'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const Navbar = (props) => {
  const { setSidebar, setVideos, selectedSuggCat, setSelectedSuggCat, selectedCategory, setSelectedCategory } = props

  const [search, setSearch] = useState('')
  const [hideNavbar, setHideNavbar] = useState(false)
  const handleSearchBar = () => {
    setSearch(refSearch.current.value)
  }
  const handleSearchClick = () => {
    if (search !== '') {
      setHideNavbar(true)
      fetchFromAPI(`search?query=${search}`)
        .then((response) => {
          setVideos(response.data)
        })
    }
  }

  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const refSearch = useRef(null)

  const open_search_bar = () => {
    ref1.current.classList.add('hidden')
    ref2.current.classList.remove('hidden')
  }
  const close_search_bar = () => {
    ref1.current.classList.remove('hidden')
    ref2.current.classList.add('hidden')
  }

  return (
    <div className='bg-[#0f0f0f] sticky top-0 left-0 z-10'>
      <div id="nav_part_1_1" ref={ref1} className="flex items-center justify-between h-12 pl-2 pr-10 border-gray-700 border-b-[1px]">
        {selectedCategory === '' ? <div className="flex items-center">
          <img src={Youtube_icon} width="35px" height="35px" alt="" className='inline' />
          <span className='text-white text-2xl font-semibold -tracking-[1px] '>YouTube</span>
        </div>
          : <div className="flex items-center text-white">
            <i onClick={() => {
              setSelectedCategory('')
              fetchFromAPI(`search?query=${selectedSuggCat}`)
                .then((response) => {
                  setVideos(response.data)
                })
            }
            }
              className={'fa-solid fa-arrow-left-long text-xl mr-4 cursor-pointer'}></i>
            <span className='text-xl font-semibold'>{selectedCategory}</span>
          </div>}
        <div className="search">
          <button type='button' onClick={open_search_bar} >
            <i className="fa-solid fa-magnifying-glass text-white opacity-80"></i>
          </button>
        </div>
      </div>

      <div id="nav_part_1_2" ref={ref2} className='hidden'>
        <div className="h-12 flex items-center justify-between px-4 bg-[#212121] border-gray-700 border-b-[1px]">
          <button type='button' onClick={close_search_bar}>
            <i
              onClick={() => {
                setHideNavbar(false)
                setSearch('')
                fetchFromAPI(`search?query=${selectedSuggCat}`)
                  .then((response) => {
                    setVideos(response.data)
                  })
              }}
              className="fa-solid fa-arrow-left text-white text-2xl opacity-80"></i>
          </button>
          <div className="search-bar flex justify-between w-4/5 rounded-2xl bg-[#383838] overflow-hidden p-1 px-4">
            <input type="text" value={search} ref={refSearch} onChange={handleSearchBar} className='w-5/6 text-white bg-[#383838] focus:outline-none' placeholder='Search YouTube' />
            <button type='button'>
              <i onClick={handleSearchClick} className="fa-solid fa-magnifying-glass text-white opacity-80"></i>
            </button>
          </div>
          <button type='button' className="">
            <i className="fa-solid fa-microphone flex justify-center items-center text-white opacity-80 bg-[#383838] rounded-full w-8 h-8"></i>
          </button>

        </div>
      </div>
      {selectedCategory === '' && hideNavbar === false && <div className="Suggested-titles bg-[#0f0f0f] text-white h-12 flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none]">
        <div className="flex items-center px-3 py-1 border-gray-700 border-r-[1px]">
          <span onClick={() => setSidebar('translate-x-0')} className='flex items-center bg-[#272727] px-3 py-1 rounded-lg cursor-pointer opacity-90'>
            <i className="fa-regular fa-compass mr-2"></i> Explore
          </span>
        </div>
        <div className="mx-3 flex items-center break-keep space-x-3 overscroll-auto">
          {suggestedCategories.map((item) => (
            <span key={item.key} onClick={() => (setSelectedSuggCat(item.value))} className={`${selectedSuggCat === item.value ? 'bg-white text-black' : 'bg-[#272727] text-white'} whitespace-nowrap px-3 py-1 rounded-lg opacity-90 cursor-pointer`}>{item.value}</span>
          ))}
        </div>
      </div>}
    </div>
  )
}

export default Navbar
