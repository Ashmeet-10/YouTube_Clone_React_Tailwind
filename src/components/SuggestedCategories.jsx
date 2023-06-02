import React from 'react'
import { suggestedCategories } from '../utils/constants'

const SuggestedCategories = (props) => {
    const { setSidebar, selectedSuggCat, setSelectedSuggCat } = props
    return (
      <div className="Suggested-titles bg-[#0f0f0f] text-white h-12 flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none]">
        <div className="flex items-center px-3 py-1 border-gray-700 border-r lg:hidden">
          <span onClick={() => setSidebar('translate-x-0')} className='flex items-center bg-[#272727] px-3 py-1 rounded-lg cursor-pointer opacity-90'>
            <i className="fa-regular fa-compass mr-2"></i> Explore
          </span>
        </div>
        <div className="mx-3 flex items-center space-x-3 overscroll-auto">
          {suggestedCategories.map((item) => (
            <span key={item.key} onClick={() => { setSelectedSuggCat(() => item.value) }} className={`${selectedSuggCat === item.value ? 'bg-white text-black' : 'bg-[#272727] text-white'} whitespace-nowrap px-3 py-1 rounded-lg opacity-90 cursor-pointer hover:bg-[#383838] duration-200 ease-in-out`}>{item.value}</span>
          ))}
        </div>
      </div>
    )
  }

export default SuggestedCategories
