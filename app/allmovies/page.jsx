'use client'
import React from 'react'
import { useContext, useEffect } from 'react'
import localFont from 'next/font/local'
import { MovieContext } from '../../context/MovieContext'
import SingleMovie from '../../components/SingleMovie';
import Image from 'next/image'

const titleFont = localFont({ src: '../../public/fonts/ArchivoBlack-Regular.ttf' })

const AllMovies = () => {
    const [movies, setMovies, getAllContents]=useContext(MovieContext)
   

    console.log(movies)
    useEffect(()=>{
        getAllContents()
    },[])
    

  return (
    <div className=''>
        <div>
            {/* <h2 className='text-center'>All Movies</h2> */}
        </div>
        <div className='container m-auto flex flex-wrap lg:gap-x-[25.5px] md:gap-x-[50px] lg:justify-normal justify-center py-10'>
            {
                movies.map((movie)=>{
                    return(
                        <SingleMovie movie={movie}/>
                    )
                })
            }
        </div>       
    </div>
  )
}

export default AllMovies
