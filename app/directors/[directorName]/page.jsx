'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { MovieContext } from '@/context/MovieContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SingleMovie from '@/components/SingleMovie';

const AboutDirector = ({params}) => {
    const [movies, setMovies, getAllContents]=useContext(MovieContext)
    const directorName=decodeURI(params.directorName)
    const [director, setDirector]=useState()
    const [lessText, setLessText]=useState(director?.about.length<390?false:true)

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
    };

    const getDirectorInfo=async()=>{
        await fetch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Directors?name=eq.${directorName}&select=*`,{
            headers:{
                apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
                Authorization:'Bearer'
            }
        })
        .then(res=>res.json())
        .then(data=>setDirector(data[0]))
    }
    
    const moviesByDirector=movies.filter((movie)=>movie.director.includes(director?.name))
    console.log(moviesByDirector)

    useEffect(()=>{
        getDirectorInfo()
        getAllContents()
    },[])
  return (
    <div className='container m-auto overflow-hidden py-10'>

      <div className='w-2/3'>
        <div className='w-full'><h2 className='text-4xl mb-5'>{director?.name}</h2></div>
        <div className='w-full'><h2 className='text-2 text-gray-400 mb-5'>Born {director?.birthday}</h2></div>
        <div className='w-full'>
          <p className={''}>{lessText?director?.about.slice(0,390)+'...':director?.about}</p>
          <button className={`${director?.about.length>390?'block':'hidden'} text-orange-300 font-bold`} onClick={()=>setLessText(!lessText)}>{lessText?'More':'Less'}</button>
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
