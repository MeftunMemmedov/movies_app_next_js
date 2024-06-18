'use client'
import React from 'react'
import { useContext, useEffect } from 'react'
import localFont from 'next/font/local'
import { MovieContext } from '../../context/MovieContext'
import SingleMovie from '../../components/SingleMovie';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMovies } from '@/redux/movieSlice'
import Loading from '@/components/Loading'
import { getWatchList } from '@/redux/userSlice'

const titleFont = localFont({ src: '../../public/fonts/ArchivoBlack-Regular.ttf' })

const AllMovies = () => {
    const [searchInput,setSearchInput]=useContext(MovieContext)
    const {watchList}=useSelector(store=>store.user)
    const {movies, isLoading}=useSelector(store=>store.movie)
    const dispatch=useDispatch()
    const userId=localStorage.getItem('userId')
    
    useEffect(()=>{
        dispatch(getAllMovies())
        
        setSearchInput('')
    },[])

    useEffect(()=>{
        dispatch(getWatchList(userId))
    },[watchList])

    if(isLoading) return <Loading />

  return (
    <div className=''>
        <div>
            {/* <h2 className='text-center'>All Movies</h2> */}
        </div>
        <div className='container  m-auto grid lg:grid-cols-4 md:grid-cols-3'>
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


    // ===========
    // const [movies, setMovies, getAllContents, persons, setPersons, getAllPersons,searchEmpty, setSearchEmpty]=useContext(MovieContext)
   

    // useEffect(()=>{
    //     getAllContents()
    //     setSearchEmpty(true)
    // },[])