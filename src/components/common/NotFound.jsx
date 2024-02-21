import React from 'react'
import { notfound } from '../../assets/image'

const NotFound = () => {
  return (
    <div className='flex justify-center w-full'>
      <div className=' flex flex-col justify-center items-center w-96 rounded-lg px-5 bg-gray-800 shadow-emerald-200 border mt-16'>
        <span className='py-4 text-4xl font-bold font-sans text-emerald-500'>{" ! Not Found ... "}</span>
        <img src={notfound} alt="notfound" className='w-96 h-60'/>
    </div>
    </div>
  )
}

export default NotFound