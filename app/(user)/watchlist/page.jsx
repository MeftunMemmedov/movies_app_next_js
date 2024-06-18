'use client'
import SingleMovie from '@/components/SingleMovie';
import { getWatchList } from '@/redux/userSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const WatchList = () => {
    const {watchList}=useSelector(store=>store.user)
    const dispatch=useDispatch()
    const userId=localStorage.getItem('userId')

    console.log(watchList)
    useEffect(()=>{
        dispatch(getWatchList(userId))
    },[watchList])
    const isEmpty=watchList.length==0

    if(isEmpty) return <> <div className=' h-screen flex justify-center items-center'><h2 className='text-orange-500 text-5xl'>Empty WatchList</h2></div></>
    
  return (
    <div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3'>
       { 
        watchList.map((movie)=>{
            return <SingleMovie movie={movie}/>
        })
       }
      </div>
    </div>
  )
}

export default WatchList
