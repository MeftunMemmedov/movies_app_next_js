import React from 'react'
import localFont from 'next/font/local'
import { LiaImdb } from "react-icons/lia";
import Link from 'next/link';

const titleFont = localFont({ src: '../public/fonts/ArchivoBlack-Regular.ttf' })

const SingleMovie = ({movie}) => {
  return (
    <div className='w-[300px] h-[450px] my-5 relative overflow-hidden border border-slate-600 hover:border-white hover:border-dashed transition duration-500'>
        <img src={movie.poster} className='w-full h-full object-cover movie-image'/>

        <div className={` absolute top-0  w-full h-full flex flex-col justify-center items-center movie-info opacity-0 hover:opacity-100 transition duration-500 px-1`}>
            <Link href={`/allmovies/${movie.title}`}>
                <h2 className={`${titleFont.className} text-3xl font-bold text-center h-[150px] `}>{movie.title}</h2>
            </Link>
        
                <div className='flex justify-center h-10'>
                    {movie.genre.slice(0,3).map((genre)=>{
                        return <h3 className={`border border-black text-xl font-bold bg-amber-600 px-1 h-[30px] text-black ${movie.genre.length<2?'mx-1':'mx-0'}`}>{genre}</h3>
                    })}                               
                </div>

                <h3>{movie.year}</h3>
                <div className='flex my-3 font-bold'>
                <LiaImdb size={40} color='gold' className='inline mx-1'/><h3 className='mt-2'>{movie.rating}</h3>
                </div>
        </div>
    </div>
  )
}

export default SingleMovie
