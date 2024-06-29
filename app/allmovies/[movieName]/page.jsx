'use client'
import { MovieContext } from '../../../context/MovieContext'
import SingleMovie from '../../../components/SingleMovie';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { LiaImdb } from "react-icons/lia";
import { FaRegBookmark, FaPlay } from "react-icons/fa";
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getMovieByName } from '@/redux/movieSlice';
import Loading from '@/components/Loading';
import axios from 'axios';
import { addToWatchList, getWatchList } from '@/redux/userSlice';
import WLLS from '@/components/WLLS';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
}


const MovieDetails = ({params}) => {
    const [searchInput, setSearchInput]=useContext(MovieContext)
    const {user}=useSelector(store=>store.user)
    // const [watchList, setWatchList]=useState([])

    const userWL=JSON.parse(localStorage.getItem(`watchlist${user?.name}`))
    const movieName=decodeURI(params.movieName)
    const {movies, movie, isLoading}=useSelector(store=>store.movie)
    const {watchList}=useSelector(store=>store.user)
    const dispatch=useDispatch()
    const singleMovie=movie[0]
    const fileredForSimilarToMovie=movies.filter((movie)=>movie.genre.includes(singleMovie?.genre[0]) || movie.genre.includes(singleMovie?.genre[1]) || movie.genre.includes(singleMovie?.genre[2]) )
    const similarToMovie=fileredForSimilarToMovie.filter((movie)=>movie.title!=singleMovie?.title)
    const filteredMoviesBySameDirector=movies.filter((movie)=>movie.director.includes(singleMovie?.director[0]))
    const moviesBySameDirector=filteredMoviesBySameDirector.filter((movie)=>movie.title!=singleMovie?.title)

    
  const userId=localStorage.getItem('userId')
    // const getWatchList=async()=>{
    //   await axios.get(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?id=eq.${userId}&select=*`,{
    //     headers:{
    //       apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
    //       Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
    //     }
    //   })
    //   .then(res=>setWatchList(res.data[0].watchlist))
    // }
    
    console.log(watchList)
    console.log(singleMovie)

    

    // const addToWatchList=async()=>{
    //   const data={
    //     watchlist:[...watchList, singleMovie]
    //   }

    //   await axios.patch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?id=eq.${userId}&select=*`, data,{
    //     headers:{
    //       apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
    //       Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
    //       "Content-Type": "application/json"
    //     }
    //   })
    // }

    // const removeFromWatchList=async(targetId)=>{
    //   const updatedWatchList = watchList.filter((item) => item.id !== targetId)

    //   const data={
    //     watchlist:updatedWatchList
    //   }

    //   await axios.patch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?id=eq.${userId}&select=*`, data,{
    //     headers:{
    //       apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
    //       Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
    //       "Content-Type": "application/json"
    //     }
    //   })
    // }
    // let checkWatchList=watchList.some((movie)=>movie?.id==singleMovie?.id)

    // const toggleWatchList=(movieId)=>{
    //   if(checkWatchList){
    //     removeFromWatchList(movieId)
    //   }else {
    //     addToWatchList()
    //   }
    // }
    
    useEffect(()=>{
      dispatch(getMovieByName(movieName))
      dispatch(getAllMovies())
      dispatch(getWatchList(userId))
      setSearchInput('')
    },[])

    if(isLoading) return <Loading />


  return (
    <div className=''>
    <div className='relative movie-page lg:h-[100vh] h-[300vh] md:h-[100vh] '>
      <div className='w-full h-full movie-page absolute z-10'></div>
      <Image 
      src={singleMovie?.poster_bg} 
      width={1000} height={400} 
      className='w-full blur bgimg'
      />
      <div className=' absolute top-10 w-full shadow-[100px]'>
        <div className='lg:container md:pl-14 mx-auto flex md:flex-row flex-col justify-around absolute z-20'>
          <div className='sm:w-full md:w-1/4 relative py-10 '>
            <Image 
            src={singleMovie?.poster} 
            width={300} 
            height={300} 
            className='w-full'/>
          </div>
          <div className='md:w-3/4 w-full p-10 '>
            <h2 className='text-4xl font-bold mb-1'>{singleMovie?.title}</h2>
            <p className='mb-4'>Directed by {singleMovie?.director.map((director)=>{return <Link href={`/persons/${director}`}>{director}</Link>})}</p>
            <p className='mb-2'>{singleMovie?.year}</p>
            <div className='flex mb-2'>
              {singleMovie?.genre.map((genre)=>{return <h4 className='mr-2'>{genre}</h4>})}
            </div>
           <div className='flex items-center'>
            <LiaImdb size={30} color='gold' className='inline mr-2'/><h5 className='font-bold'>{singleMovie?.rating}</h5>
           </div>
           <div className='my-10 flex'>
            <Link href={`${singleMovie?.trailer_url}`} className='border rounded-3xl bg-white text-black p-2 mr-3 flex justify-around items-center'><FaPlay size={20} className='inline mx-1 mb-1'/>Watch Trailer</Link>
            {/* <button className='border rounded-3xl bg-white text-black p-2' onClick={()=>toggleWatchList(singleMovie?.id)}>{checkWatchList?<FaRegBookmark size={30} color='red'/>:<FaRegBookmark size={30} />}</button> */}
           <WLLS movie={singleMovie}/>
           </div>
           <div className=''>
            <p>{singleMovie?.description}</p>
           </div>
          </div>
        </div>
      </div>
    </div>

   

     <div className='bg-black relative h-[400px]'>
      <div className='flex justify-around container m-auto'>
        {
          singleMovie?.images.map((img)=>{
            return (
              <div className='w-[32%] h-64  relative '>
                  <Image 
                  src={img} 
                  fill 
                  objectFit='cover'/>
              </div>
            )
          })
        }
      </div>
    </div>

    <div className='bg-black'>
      <h2 className='text-2xl font-bold text-orange-400 ml-5 mb-14'>Cast</h2>
    <div className=' flex justify-around'>
      {singleMovie?.cast.map((actor)=>{
        return (
          <div className='flex flex-col w-36 text-center'>
            <div className=''>
              <img src='https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg' className='w-full rounded-full'/>
            </div>
            <div>
              <h2>{actor.realName}</h2>
              <h2 className='text-gray-700'>{actor.characterName}</h2>
            </div>
          </div>
        )
      })}
    </div>
  </div>

    <div className='relative w-full bg-black h-[100vh] py-16 '>
      <h2 className='text-4xl font-bold ml-5 text-orange-400'>Similar to {singleMovie?.title}</h2>
      <div className='container m-auto'>    
      <Carousel responsive={responsive} ssr className=''>
        {
          similarToMovie?.map((similarMovie)=>{
            return <SingleMovie movie={similarMovie}/>
            })
            }      
          </Carousel>
      </div>
    </div>

    <div className='relative w-full bg-black h-[90vh] py-16 '>
      <h2 className='text-4xl font-bold ml-5 text-orange-400'>Other movies by {singleMovie?.director}</h2>
      <div className='container m-auto'>    
      <Carousel responsive={responsive} ssr className=''>
        {
          moviesBySameDirector?.map((movie)=>{
            return <SingleMovie movie={movie}/>
            })
            }      
          </Carousel>
      </div>
    </div>
    
    </div>
  )
}

export default MovieDetails

// const [movies, setMovies, getAllContents,persons, setPersons, getAllPersons,searchEmpty, setSearchEmpty]=useContext(MovieContext)
    // const [movieDetails, setMovieDetails]=useState()

  //   const getMovieByName=async()=>{
  //     await fetch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies?title=eq.${movieName}&select=*`,{
  //       method:"GET",
  //           headers:{
  //               apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
  //               Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs'
  //           }
  //     })
  //     .then(res=>res.json())
  //     .then(jsonData=>setMovieDetails(jsonData[0]))
  //   }
    
  //   console.log(movies)

  //   const fileredForSimilarToMovie=movies.filter((movie)=>movie.genre.includes(movieDetails?.genre[0]) || movie.genre.includes(movieDetails?.genre[1]) || movie.genre.includes(movieDetails?.genre[2]) )
  //   const similarToMovie=fileredForSimilarToMovie.filter((movie)=>movie.title!=movieDetails?.title)
  //   const filteredMoviesBySameDirector=movies.filter((movie)=>movie.director.includes(movieDetails?.director[0]))
  //   const moviesBySameDirector=filteredMoviesBySameDirector.filter((movie)=>movie.title!=movieDetails?.title)

  //  useEffect(()=>{
  //     getMovieByName()
  //     getAllContents()
  //     window.scrollTo(0,0)
  //     setSearchEmpty(true)
  //  },[])
