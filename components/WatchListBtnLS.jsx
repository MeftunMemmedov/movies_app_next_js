//localStorage (for multiple users(in object) in one array) version of watchlist
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const WatchListBtnLS = ({movie}) => {
    let watchlistLS=localStorage.getItem('watchlist')?JSON.parse(localStorage.getItem('watchlist')):[]
    const {user}=useSelector(store=>store.user)
    const dispatch=useDispatch()

    let currentUsersWatchlist=watchlistLS.find((wl)=>wl.user==user?.name) 
    
    const addToWatchlist=()=>{
        currentUsersWatchlist.watchlist.push(movie)
        localStorage.setItem('watchlist',JSON.stringify(watchlistLS))
    }

    const removeFromWatchList=()=>{
        let modifiedWatchList=currentUsersWatchlist.watchlist.filter((mov)=>mov.id !== movie.id)

        currentUsersWatchlist.watchlist=modifiedWatchList        

        localStorage.setItem('watchlist', JSON.stringify(watchlistLS))
    }
    
    const toggleWatchList=()=>{
      if(currentUsersWatchlist.watchlist.some((mov)=>mov.id==movie.id)){
        removeFromWatchList()
      }else{
        addToWatchlist()
      }
    }
    
  return (
    <div className='w-16 h-16'>
      <button 
      className='w-full h-full  flex justify-center items-center'
        onClick={toggleWatchList}
      >
       add to watchList
    </button>
    </div>
  )
}

export default WatchListBtnLS
