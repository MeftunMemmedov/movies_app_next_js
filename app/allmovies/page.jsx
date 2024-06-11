'use client'
import React from 'react'
import { useContext, useEffect } from 'react'
import { MovieContext } from '../context/MovieContext'

import localFont from 'next/font/local'
import SingleMovie from '../components/SingleMovie';


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
            <h2 className='text-center'>All Movies</h2>
        </div>
        <div className='container m-auto flex flex-wrap justify-between'>
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
