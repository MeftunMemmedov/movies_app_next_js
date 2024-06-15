'use client'
import SingleMovie from '@/components/SingleMovie'
import { MovieContext } from '@/context/MovieContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const MoviesByCategory = ({params}) => {
    
    const [movies, setMovies, getAllContents]=useContext(MovieContext)
    const [categoryDescription, setCategoryDescription]=useState('')
    // const [moviesByCategory, setMoviesByCategory]=useState([])
    const moviesByCategory=movies.filter((movie)=>movie.genre.includes(params.category.charAt(0).toUpperCase()+params.category.slice(1)))
    
    // console.log(moviesByCategory)
    


    useEffect(()=>{
        getAllContents()
        
        if(params.category=='action'){
            setCategoryDescription("Welcome to the edge of your seat, because it's time to dive into the action. From classic westerns and war films to modern action hero adventures, it’s all right here on Plex.")
        }else if(params.category=='crime'){
            setCategoryDescription("Ever wonder what makes a comedy great? We put together a collection of the best comedies we could find so you can watch and learn from the best in the biz.")
        }else if(params.category=='drama'){
            setCategoryDescription("Dramatic movies often defy classification. If it isn't funny or scary then it may be a drama. While there will always be crossovers, Plex has put together the best dramatic movies and shows we could find for you to enjoy.")
        }else if(params.category=='comedy'){
            setCategoryDescription('Ever wonder what makes a comedy great? We put together a collection of the best comedies we could find so you can watch and learn from the best in the biz.')
        }else if(params.category=='thriller'){
            setCategoryDescription('The best thrillers will evoke suspense, mystery and will lead to shocking endings that leave your heart racing. Explore the dark corners of the world and discover secrets and unexpected twists that will always bring you back for more.')
        }else if(params.category=='horror'){
            setCategoryDescription("Check out the best horror movies and shows, complete with maniacs, slashers, ghosts, goblins, and everything in between.")
        }else if(params.category=='sci-fi'){
            setCategoryDescription("Sci-fi movies can take us to distant worlds and reveal fantastic futures beyond belief. Time-traveling cyborgs, dystopian futures, and more are here for you to discover. Grab some popcorn and head into adventure.")
        }

    },[])
  return (
    <div>
        {/* <h2 className='text-center text-2xl font-bold my-10'>{params.category.charAt(0).toUpperCase()+params.category.slice(1)} Movies</h2> */}
        <div className=' h-screen relative overflow-hidden  category-page-banner'>
            <Image src={moviesByCategory[0]?.poster} width={600} height={300} className='absolute right-0 z-[-10]'/>
            <div className='container m-auto  h-full px-10'>
                <div className='w-1/2 h-full flex flex-col justify-center items-start'>
                    <h2 className='text-5xl font-bold mb-5'>{params.category.charAt(0).toUpperCase()+params.category.slice(1)} Movies</h2>
                    <p className='mb-5'>{categoryDescription}</p>
                    <Link href={''} className=' py-3 px-10 rounded-3xl bg-amber-500 text-black font-bold'>Sign Up</Link>
                </div>
            </div>
        </div>
      <div className='container m-auto flex flex-wrap lg:gap-x-[25.5px] md:gap-x-[50px] mt-10'>
        {
            moviesByCategory.map((movie)=>{
                return(
                    <SingleMovie movie={movie}/>
                )
            })
        }
      </div>
    </div>
  )
}

export default MoviesByCategory
