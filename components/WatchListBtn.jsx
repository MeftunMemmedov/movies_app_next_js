'use client'
//api version of wacthlist 
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegBookmark, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FaBookmark } from "react-icons/fa6";
import { getWatchList } from '@/redux/userSlice';
import { FaSpinner } from "react-icons/fa6";




const WatchListBtn = ({movie}) => {
    const {watchList}=useSelector(store=>store.user)
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const userId=localStorage.getItem('userId')

    const addToWatchList=async()=>{
        try {
            setLoading(true)
            const data={
                watchList:[...watchList, movie]
              }
              
              await axios.patch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?id=eq.${userId}&select=*`, data,{
                headers:{
                  apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
                  Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
                  "Content-Type": "application/json"
                }
              })
              setLoading(false)
        } catch (error) {
            console.log(error)
        }

      }
  
      const removeFromWatchList=async(targetId)=>{
       try {
        setLoading(true)
        const updatedWatchList = watchList.filter((item) => item.id !== targetId)
  
        const data={
          watchList:updatedWatchList
        }
  
        await axios.patch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?id=eq.${userId}&select=*`, data,{
          headers:{
            apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
            "Content-Type": "application/json"
          }
        })
        setLoading(false)
       } catch (error) {
        console.log(error)
       }
      }

      const checkWatchList=watchList.some((mov)=>mov.id==movie?.id)
  
      const toggleWatchList=(movieId)=>{
        if(checkWatchList){
          removeFromWatchList(movieId)
        }else {
          addToWatchList()
        }
      }

      useEffect(()=>{
        dispatch(getWatchList(userId))
      },[])

  return (
    <div className='w-16 h-16'>
      <button 
      className='w-full h-full  flex justify-center items-center'
      disabled={loading?true:false}
      onClick={()=>toggleWatchList(movie.id)}
      >
        {
            loading?
            <FaSpinner size={60} className='animate-spin'/>:
            ''
        }
        {   
            checkWatchList?
            <FaBookmark size={40}/>:
            <FaRegBookmark size={40}/>
        }
    </button>
    </div>
  )
}

export default WatchListBtn
