'use client'
import Video from 'next-video';
import video2 from '../videos/0609.mp4'
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { MovieContext } from '@/context/MovieContext';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import SingleMovie from '@/components/SingleMovie';
import 'react-multi-carousel/lib/styles.css';
import { getAllMovies } from '@/redux/movieSlice';
import { getAllPersons } from '@/redux/personSlice';
import { getWatchList } from '@/redux/userSlice';



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


export default function Home() {
  const [searchInput, setSearchInput]=useContext(MovieContext)
  const {watchList, user}=useSelector(store=>store.user)
  const {isLoggedIn}=useSelector(store=>store.user)
  const {movies}=useSelector(store=>store.movie)
  const dispatch=useDispatch()
  const topMovies=movies.filter((movie)=>movie.rating>7)
  const userId=localStorage.getItem('userId')

  useEffect(()=>{
    setSearchInput('')
    
  },[])
  
  useEffect(()=>{
    dispatch(getWatchList(userId))
    setTimeout(()=>{
      localStorage.setItem(`watchlist${user?.name}`, JSON.stringify(watchList))
    },5000)
    setTimeout(()=>{
      localStorage.removeItem(`watchlistundefined`)
    },5000)
  },[watchList])
  // {
  //   "characterName":"",
  //   "realName":""
  // }
  return (
  <div>
    <div className="mx-auto relative lg:h-[89.6vh] md:h-[85vh] h-[600px]  home-box-1 overflow-hidden ">
      <div className='w-full h-full '>

        <div className='lg:w-1/2 md:w-1/2 w-full flex flex-col justify-center items-end h-full '>          
          <div className='w-4/5 mr-8 text-center lg:text-start md:text-start'>
            <h2 className='font-bold  text-4xl mb-8'>Go ahead, stream free</h2>
            <p className=' mb-12'>With Plex you can watch over 20,000 free movies and shows, plus Live TV on almost any device. What are you waiting for?</p>
            {
              isLoggedIn?
              <Link href={'/allmovies'} className=' py-3 px-10 rounded-3xl bg-amber-500 text-black font-bold'>Go and Watch Movies</Link>
              :
              <Link href={'/sign-up'} className=' py-3 px-10 rounded-3xl bg-amber-500 text-black font-bold'>Sign Up</Link>
            }
          </div>         
        </div>
        
      </div>
       
       <div className=' absolute sm:w-full lg:w-3/4 md:w-3/4 h-full lg:top-0 md:top-0 top-[-200px]  right-0 z-[-1000] home-box-1-video'>
        <Video 
          src={video2}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className='h-full '
        />
       </div>
    </div>

    <div className='container m-auto'>
      <h2 className='ml-5 text-3xl font-bold text-orange-400'>Top Movies</h2>
    <Carousel responsive={responsive} ssr className=''>
        {
          topMovies.map((topMovie)=>{
            return <SingleMovie movie={topMovie}/>
            })
            }      
      </Carousel>
    </div>
  </div>
  );
}
