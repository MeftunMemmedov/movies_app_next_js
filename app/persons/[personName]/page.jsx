'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { MovieContext } from '@/context/MovieContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SingleMovie from '@/components/SingleMovie';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPersons } from '@/redux/personSlice';
import { getAllMovies } from '@/redux/movieSlice';
import Loading from '@/components/Loading';


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


const AboutDirector = ({params}) => {
  const [searchInput,setSearchInput]=useContext(MovieContext)
  
  const personName=decodeURI(params.personName)
  const {movies, isLoading}=useSelector(store=>store.movie)
  const {persons, isLoadingPerson}=useSelector(store=>store.person)
  const dispatch=useDispatch()
    
          

  const currentDirector=persons.find((person)=>person.name==personName)
  const moviesByDirector=movies.filter((movie)=>movie.director.includes(currentDirector?.name))

  useEffect(()=>{
    dispatch(getAllPersons())
    dispatch(getAllMovies())
    setSearchInput('')
  },[])

  if(isLoadingPerson) return <Loading />
  

  return (
    <div className='container m-auto overflow-hidden py-10'>

      <div className='w-2/3'>
        <div className='w-full'><h2 className='text-4xl mb-5'>{currentDirector?.name}</h2></div>
        <div className='w-full'><h2 className='text-2 text-gray-400 mb-5'>Born {currentDirector?.birthday}</h2></div>
        <div className='w-full'>
          <p className={''}>{currentDirector?.about}</p>
          {/* <button className={` text-orange-300 font-bold`}>{lessText?'More':'Less'}</button> */}
        </div>    
      </div>

      <div className='mt-10'>
        <h2 className='font-bold text-xl'>Known for</h2>
      <Carousel responsive={responsive} ssr className=''>
        {
          moviesByDirector?.map((movie)=>{
            return <SingleMovie movie={movie}/>
            })
            }      
          </Carousel>
      </div>
    </div>

  )
}

export default AboutDirector
