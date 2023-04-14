import React from 'react'
import Loading_icon from '../assets/Loading.svg'

const Loading = (props) => {
  return (
    <div className={`bg-[#0f0f0f] text-white w-full min-h-[40vh] flex justify-center ${props.classes}`}>
      <img src={Loading_icon} className="w-12 animate-spin mt-4" alt="" />
    </div>
  )
}

export default Loading
