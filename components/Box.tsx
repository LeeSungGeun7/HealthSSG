import React from 'react'

function Box(props:any) {
  return (
    <button type="submit" className='rounded-lg p-[5px] flex justify-center items-center h-[40px] w-[100px] bg-black text-white'>{props.name}</button>
  )
}

export default Box