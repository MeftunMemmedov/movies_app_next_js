//localstorage (specific array for each user) version of watchlist
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { FaRegBookmark, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { FaBookmark } from "react-icons/fa6";
import { getWatchList } from '@/redux/userSlice';
import { FaSpinner } from "react-icons/fa6";

const WLLS = ({movie}) => {
    const {user}=useSelector(store=>store.user)
    const userWL=JSON.parse(localStorage.getItem(`watchlist${user?.name}`))
    const {watchList}=useSelector(store=>store.user)
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const userId=localStorage.getItem('userId')
    // const [watchList, setWatchList]=useState()
   
    const toggleWatchList=async()=>{

      

        if(userWL.some((mov)=>mov.id==movie.id)){
          
          try {
            
            const newWatchList=userWL.filter((item) => item.id !== movie.id)
            localStorage.setItem(`watchlist${user.name}`, JSON.stringify(newWatchList))
              setLoading(true)
              const updatedWatchList = watchList.filter((item) => item.id !== movie.id)
        
              const data={
                watchList:newWatchList
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
        }else {
           
          
          try {
              const newItems = JSON.stringify([...userWL, movie])
              localStorage.setItem(`watchlist${user.name}`, newItems)
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
        }
        
    
  return (
    <div className='w-16 h-16'>
      <button 
      className='w-full h-full  flex justify-center items-center'
        onClick={toggleWatchList}
      >
       {   
       userWL?.some((mov)=>mov.id==movie?.id)?
            <FaBookmark size={40}/>:
            <FaRegBookmark size={40}/>
        }
    </button>
    </div>
  )
}

export default WLLS
