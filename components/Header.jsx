'use client'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import localFont from 'next/font/local'
import { BiMoviePlay } from "react-icons/bi";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { MovieContext } from '@/context/MovieContext';
import SearchResult from './SearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '@/redux/movieSlice';
import { getAllPersons } from '@/redux/personSlice';
import { getCurrentUser, setIsLoggedIn } from '@/redux/userSlice';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from 'next/navigation';


const logoFont=localFont({ src: '../public/fonts/JosefinSans-Bold.ttf' })


const Header = () => {
const [searchInput,setSearchInput]=useContext(MovieContext)
const router=useRouter()
// const [searchInput, setSearchInput]=useState('')
const [searchFocus, setSearchFocus]=useState(false)

const {movies, isLoading}=useSelector(store=>store.movie)  
const {persons}=useSelector(store=>store.person)  
const {users, isLoggedIn, user}=useSelector(store=>store.user)
const [dropdown, setDropdown]=useState(false)
const dispatch=useDispatch()


const searchMovieResults=movies.filter((movie)=>movie.title.toLowerCase().includes(searchInput))
const getDirectors=persons.filter((person)=>person.isDirector===true)
const searchDirectorResults=getDirectors.filter((director)=>director.name.toLowerCase().includes(searchInput))

const userId=localStorage.getItem('userId')
const logout=()=>{
  localStorage.removeItem('userId')
  dispatch(setIsLoggedIn())
  router.replace('/')
}
useEffect(()=>{
  dispatch(getAllMovies())
  dispatch(getAllPersons())  
},[])



useEffect(()=>{
  dispatch(getCurrentUser(userId))
},[userId])

  return (
    <>
      <header className='backdrop-blur-xl h-16 sticky top-0 z-50'>
        <div className='container flex justify-around m-auto h-full'>

          <div className='lg:w-4/12 md:w-3/5  flex justify-around items-center '>
            <Link href={'/'}>
              <h2 className={` ${logoFont.className} font-bold md:text-2xl text-xl lg:ml-5 m-0 w-1/5 text-orange-400`}>Movies</h2>
            </Link>
            <div className='w-3/5 h-8 relative'>
              <label htmlFor='search' className={`absolute right-5 top-2 `}>
                <FaSearch className={`${searchFocus?'text-black':'white'} ${searchInput==''?'block':'hidden'}`}/>
              </label>
              <input 
                type='search' 
                id='search'
                placeholder='search...'
                onChange={(e)=>setSearchInput(e.target.value.toLocaleLowerCase())}            
                className='w-full h-full rounded-3xl bg-zinc-800 focus:bg-white focus:outline-0 focus:text-black px-5' 
                onFocus={()=>setSearchFocus(true)} 
                onBlur={()=>setSearchFocus(false)} 
              />
              <div className={`${searchInput=='' || !searchFocus?'hidden':''} search-results absoulte px-2 h-96 w-[400px] bg-slate-800 overflow-y-scroll`}>
                  <h2 className='font-bold text-orange-400'>Movies</h2>
                  {searchMovieResults.length==0?
                    <h2 className='text-slate-600 py-2'>Not Found</h2>
                  :
                    searchMovieResults?.map((result)=>{
                      return (
                        <SearchResult result={result} setSearchInput={setSearchInput}/>
                      )
                    })
                  }
                  <h2 className='font-bold text-orange-400'>Directors</h2>
                  { searchDirectorResults.length==0?
                  <h2 className='text-slate-600 py-2'>Not Found</h2>
                  :
                    searchDirectorResults?.map((director)=>{
                      return <SearchResult result={director} setSearchInput={setSearchInput}/>
                    })
                  }
              </div>
            </div>
          </div>

          <div className='lg:w-2/5 lg:block hidden '>
            <nav className=' h-full flex items-center flex gap-x-2'>
              <Link href={'/allmovies'} className='border border-slate-600 p-2 rounded-3xl'><BiMoviePlay className='inline mb-1 mx-1' size={20}/>All Movies</Link>
              <Link href={'/category'} className='border border-slate-600 p-2 rounded-3xl'><BsFillCameraReelsFill className='inline mb-1 mx-1' size={20}/>Categories</Link>
            </nav>
          </div>

          <div className='w-1/4 flex justify-end items-center '>
            {
              isLoggedIn?
              <>
              <div className='lg:mr-20 md:mr-10 font-bold bg-zinc-800 w-14 h-14 flex justify-center items-center rounded-full'>
                {user?.name}
              </div>
              <div className='relative'>
                <button onClick={()=>setDropdown(!dropdown)}><MdKeyboardArrowDown size={40}/></button>
                <div className={` ${dropdown?'block':'hidden'} border w-32 h-32 absolute top-10 bg-black right-0 flex flex-col justify-around items-center px-2 z-50`}>
                  <Link href={'/watchlist'} className='w-full text-center border py-3 bg-white text-black'>WatchList</Link>
                  <button 
                  className='w-full py-3 border bg-red-800' 
                  onClick={logout}
                  >
                    LogOut
                  </button>
                </div>
              </div>
              </>
              :
              <Link 
              href={'/sign-in'} 
              className='lg:mr-20 md:mr-10 font-bold bg-zinc-800 w-20 h-10 flex justify-center items-center rounded-3xl'><p>Sign In</p></Link>
            }
          </div>

        </div>        
      </header>
    </>
  )
}

export default Header


// const [movies, setMovies, getAllContents, directors, setDirectors, getAllDirectors,searchEmpty, setSearchEmpty]=useContext(MovieContext)
// const [searchInput, setSearchInput]=useState('')
// const [searchFocus, setSearchFocus]=useState(false)
 

// useEffect(()=>{
//   getAllContents()
//   getAllDirectors()
// },[])