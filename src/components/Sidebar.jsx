import React from 'react'
import Youtube_icon from '../assets/Youtube_icon.svg'
import { Categories } from '../utils/constants'

const Sidebar = (props) => {
  const { sidebar, setSidebar } = props
  return (
    <div className={`absolute top-0 left-0 ${sidebar} w-[70%] h-[100vh] bg-[#383838] text-white px-5 ease-in-out duration-500 z-10`}>
      <div className="h-12 flex items-center">
        <i onClick={() => setSidebar('-translate-x-full')} className={'fa-solid fa-arrow-left-long text-xl mr-4 cursor-pointer'}></i>
        <img src={Youtube_icon} width="35px" height="35px" alt="YouTube" className='inline' />
        <span className='text-white text-2xl font-semibold -tracking-[1px] '>YouTube</span>
      </div>
      <div className="flex flex-col my-3 space-y-3">
        {Categories.map((item) => (
          <span key={item.key} className='rounded-lg opacity-90 cursor-pointer'>
            <i className={`${item.icon} inline-flex justify-center items-center text-white w-5 h-5 mr-4 text-xl`}></i> {item.value}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
