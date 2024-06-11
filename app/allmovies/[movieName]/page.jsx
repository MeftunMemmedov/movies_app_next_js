'use client'
import { MovieContext } from '@/app/context/MovieContext'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { LiaImdb } from "react-icons/lia";
import { FaRegBookmark, FaPlay } from "react-icons/fa";
import Link from 'next/link';



const MovieDetails = ({params}) => {
    const movieName=decodeURI(params.movieName)
    const [movies]=useContext(MovieContext)
    const [movieDetails, setMovieDetails]=useState()

    console.log(movieName)
    
    
    
    const getMovieByName=async()=>{
      await fetch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies?title=eq.${movieName}&select=*`,{
        method:"GET",
            headers:{
                apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
                Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs'
            }
      })
      .then(res=>res.json())
      .then(jsonData=>setMovieDetails(jsonData[0]))
    }
    
    console.log(movieDetails)

   useEffect(()=>{
      getMovieByName()
   },[])

    
  return (
    <div className=''>
    <div className='relative movie-page lg:h-[100vh] h-[300vh] md:h-[100vh] '>
      <div className='w-full h-full movie-page  absolute z-10'></div>
      <Image src={movieDetails?.poster_bg} width={1000} height={900} className='w-full blur-2xl bgimg'/>
      <div className=' absolute top-10 w-full shadow-[100px]'>
        <div className='lg:container md:pl-14 mx-auto flex md:flex-row flex-col justify-around absolute z-20'>
          <div className='sm:w-full md:w-1/4 relative py-10 '>
            <Image src={movieDetails?.poster} width={300} height={300} className='w-full'/>
          </div>
          <div className='md:w-3/4 w-full p-10 '>
            <h2 className='text-4xl font-bold mb-1'>{movieDetails?.title}</h2>
            <p className='mb-4'>Directed by {movieDetails?.director.map((director)=>{return <Link href={''}>{director}</Link>})}</p>
            <p className='mb-2'>{movieDetails?.year}|{movieDetails?.isAdult?'18+':''}</p>
            <div className='flex mb-2'>
              {movieDetails?.genre.map((genre)=>{return <h4 className='mr-2'>{genre}</h4>})}
            </div>
           <div className='flex items-center'>
            <LiaImdb size={30} color='gold' className='inline mr-2'/><h5 className='font-bold'>{movieDetails?.rating}</h5>
           </div>
           <div className='my-10 flex'>
            <Link href={`${movieDetails?.trailer_url}`} className='border rounded-3xl bg-white text-black p-2 mr-3'><FaPlay size={20} className='inline mx-1 mb-1'/>Watch Trailer</Link>
            <button className='border rounded-3xl bg-white text-black p-2'><FaRegBookmark size={25} className='inline '/>Add to Watchlist</button>
           </div>
           <div className=''>
            <p>{movieDetails?.description}</p>
           </div>
          </div>
        </div>
      </div>
    </div>

    <div className='border'>
      <div className=''>
      
      </div>
    </div>
    
    </div>
  )
}

export default MovieDetails
