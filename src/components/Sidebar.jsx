import React, { useRef } from 'react'
import Youtube_icon from '../assets/Youtube_icon.svg'
import { Categories } from '../utils/constants'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = (props) => {
  const ref = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebar, setSidebar, selectedCategory, setSelectedCategory, expandLgScreenSidebar } = props
  return (
    <div className='overflow-hidden lg:w-56 xl:w-60 min-[1400px]:w-64 2xl:w-[17rem] 3xl:w-72'>
      <div className={`fixed top-0 left-0 ${sidebar} w-[70%] h-[100vh] bg-[#383838] text-white px-5 ease-in-out duration-500 z-20 xxs:w-[16rem] lg:hidden`}>
        <div className="h-12 flex items-center lg:hidden">
          <i ref={ref} onClick={() => setSidebar('-translate-x-full')} className={'fa-solid fa-arrow-left-long text-xl mr-4 cursor-pointer'}></i>
          <img src={Youtube_icon} width="35px" height="35px" alt="YouTube" className='inline' />
          <span className='text-white text-2xl font-semibold -tracking-[1px] '>YouTube</span>
        </div>
        <div className="flex flex-col my-3 space-y-3">
          {Categories.map((item) => (
            <span
              onClick={() => {
                setSelectedCategory(item.value)
                ref.current.click()
                navigate('/explore')
              }}
              key={item.key} className='rounded-lg opacity-90 cursor-pointer'>
              <i className={`${item.icon} inline-flex justify-center items-center text-white w-5 h-5 mr-4 text-xl`}></i> {item.value}
            </span>
          ))}
        </div>
      </div>


      {/* Sidebar for larger screens */}
      {expandLgScreenSidebar && <div className={`hidden fixed top-0 left-0 ${sidebar} w-[70%] h-[100vh] bg-[#383838] text-white overflow-y-auto scrollbar text-sm px-3 ease-in-out duration-500 z-20  lg:translate-x-0 lg:top-16 lg:bg-[#0f0f0f] lg:block lg:w-56 xl:w-60 min-[1400px]:w-64 2xl:w-[17rem] 3xl:w-72`}>
        <div className="flex flex-col my-3 space-y-0">
          <span
            onClick={() => {
              setSelectedCategory('Home')
              navigate('/')
            }}
            className={`rounded-lg opacity-90 cursor-pointer hover:bg-[#212121] p-3 ${(selectedCategory === 'Home' && location.pathname === '/') ? 'bg-[#212121]' : ''}`}>
            <i className={`fa-solid fa-house inline-flex justify-center items-center text-white w-5 h-5 mr-4 text-xl`}></i> Home
          </span>
          <span
            onClick={() => {
              setSelectedCategory('Shorts')
              navigate('/explore')
            }}
            className={`rounded-lg opacity-90 cursor-pointer p-3 hover:bg-[#212121] ${(selectedCategory === 'Shorts' && location.pathname === '/explore') ? 'bg-[#212121]' : ''}`}>
            <i className={`fa-solid fa-camera-retro inline-flex justify-center items-center text-white w-5 h-5 mr-4 text-xl`}></i> Shorts
          </span>
          {Categories.map((item) => (
            <span
              onClick={() => {
                setSelectedCategory(item.value)
                navigate('/explore')
              }}
              key={item.key} className={`rounded-lg opacity-90 cursor-pointer p-3 hover:bg-[#212121]  ${(item.value === selectedCategory && location.pathname === '/explore') ? 'bg-[#212121]' : ''}`}>
              <i className={`${item.icon} inline-flex justify-center items-center text-white w-5 h-5 mr-4 text-xl`}></i> {item.value}
            </span>
          ))}
        </div>
      </div>}

      {!expandLgScreenSidebar && <div className={`hidden fixed top-0 left-0 ${sidebar} h-[100vh] bg-[#383838] text-white text-sm px-3 ease-in-out duration-500 z-20 lg:translate-x-0 lg:top-16 lg:bg-[#0f0f0f] lg:block lg:w-20`}>
        <div className="flex flex-col my-3 space-y-1">
          <div
            onClick={() => {
              setSelectedCategory('Home')
              navigate('/')
            }}
            className={`flex flex-col justify-center items-center rounded-lg opacity-90 cursor-pointer hover:bg-[#212121] p-3`}>
            <i className={`fa-solid fa-house inline-flex justify-center items-center text-white w-5 h-5 text-base`}></i>
            <span className='text-xs mt-1'>Home</span>
          </div>
          <div
            onClick={() => {
              setSelectedCategory('Shorts')
              navigate('/explore')
            }}
            className={`flex flex-col justify-center items-center rounded-lg opacity-90 cursor-pointer p-3 hover:bg-[#212121]`}>
            <i className={`fa-solid fa-camera-retro inline-flex justify-center items-center text-white w-5 h-5 text-base`}></i>
            <span className='text-xs mt-1'>Shorts</span>
          </div>
          <div
            onClick={() => {
              setSelectedCategory('Trending')
              navigate('/explore')
            }}
            className={`flex flex-col justify-center items-center rounded-lg opacity-90 cursor-pointer p-3 hover:bg-[#212121]`}>
            <i className={`fa-solid fa-fire-flame-curved inline-flex justify-center items-center text-white w-5 h-5 text-base`}></i>
            <span className='text-xs mt-1'>Trending</span>
          </div>
          <div
            onClick={() => {
              setSelectedCategory('Live')
              navigate('/explore')
            }}
            className={`flex flex-col justify-center items-center rounded-lg opacity-90 cursor-pointer p-3 hover:bg-[#212121]`}>
            <i className={`fa-solid fa-tower-broadcast inline-flex justify-center items-center text-white w-5 h-5 text-base`}></i>
            <span className='text-xs mt-1'>Live</span>
          </div>
        </div>
      </div>}

    </div>
  )
}

export default Sidebar
