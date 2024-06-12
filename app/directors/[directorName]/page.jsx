'use client'
import React, { useEffect, useState } from 'react'

const AboutDirector = ({params}) => {
    const directorName=decodeURI(params.directorName)
    const [director, setDirector]=useState()

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

    useEffect(()=>{
        getDirectorInfo()
    },[])
  return (
    <div>
      {director?.name}
    </div>
  )
}

export default AboutDirector
