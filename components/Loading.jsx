'use client'
import Image from 'next/image'
import React from 'react'
import camera1 from '../public/images/camera1.png'
import camera2 from '../public/images/camera3.png'


const Loading = () => {
  return (
    <div className='h-[100vh] flex justify-center flex-col items-center '>
            <div className='relative h-1/2 w-1/5  flex justify-center items-center'>
                <Image src={camera2} width={80} height={100} className=' absolute top-[50px] right-[70px] animate-spin'/>
                <Image src={camera2} width={80} height={100} className=' absolute top-[50px] left-[30px] animate-spin'/>
                <Image src={camera1} width={400} height={400} />    
            </div>
            <h2 className='italic font-bold w-100 text-4xl'>Loading...</h2>
        </div>
  )
}

export default Loading
