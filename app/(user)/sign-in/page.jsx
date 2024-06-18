'use client'
import { getUsers, setIsLoggedIn } from '@/redux/userSlice'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const SignIn = () => {
    const dispatch=useDispatch()
    // const navigate=useNavigate()
    const router=useRouter()
    const {users,isLoggedIn}=useSelector(store=>store.user)

    const [input, setInput]=useState({
        name:'',
        email:'',
        password:''
    })

    const handleChange=(e)=>{
        setInput(prevState=>{
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(users.some((user)=>user.email==input.email && user.password==input.password)){
            let userInfo=users.find((user)=>user.email==input.email)
            localStorage.setItem('userId',userInfo.id)
            dispatch(setIsLoggedIn())
            router.replace('/')
        }else{
            alert('Something wrong')
        }
    }

    console.log(users)
    useEffect(()=>{
        dispatch(getUsers()) 
   },[])
  return (
    <div className='h-screen'>
      <div className='container h-full flex justify-center items-center'>
        <div className='lg:w-2/5 md:w-1/2 w-full h-96'>
            
            <form onSubmit={handleSubmit} className='flex flex-col justify-around items-center w-full h-full px-16 py-5'>
                <h2 className='text-4xl font-bold'>Sign In</h2>
                <div className='flex flex-col w-full'>
                    <label htmlFor='email'>Email</label>    
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className='h-8 rounded-md focus:outline-0 text-black px-2'
                    onChange={handleChange}

                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor='password'>Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    className='h-8 rounded-md focus:outline-0 text-black px-2'
                    onChange={handleChange}

                    />
                </div>
                <button className='bg-orange-400 rounded-xl py-3 w-1/2'>Sign Up</button>
            </form>
            <p className='text-white text-center'>New to Movies? Then <Link href={'/sign-up'} className='text-orange-400'>Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
