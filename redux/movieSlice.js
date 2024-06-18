'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllMovies=createAsyncThunk("getAllMovies", async()=>{
    const response = await fetch('https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies?select=*',{
        method:"GET",
        headers:{
            apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs'
        }
    })

    const jsonData=response.json()
    return jsonData
})


export const getMovieByName=createAsyncThunk("getMovieByName", async(movieName)=>{
    const response=await fetch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies?title=eq.${movieName}&select=*`,{
        method:"GET",
            headers:{
                apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
                Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs'
            }
      })
    const jsonData=response.json()
    return jsonData
      
})

export const movieSlice=createSlice({
    name:"movie",
    initialState:{
        isLoading:false,
        movies:[],
        movie:[],
        watchList:localStorage.getItem('wacthList')?JSON.parse(localStorage.getItem('watchList')):[],
    },
    reducers:{
        addToWatchList:(state, action)=>{
            [...state.watchList, action.payload]
        }
    }
    ,
    extraReducers:(builder)=>{
        builder.addCase(getAllMovies.pending, (state)=>{
            state.isLoading=true
        })
        builder.addCase(getAllMovies.fulfilled, (state,action)=>{
            state.movies=action.payload
            state.isLoading=false
        })
        // ======================
        builder.addCase(getMovieByName.pending, (state,action)=>{
            state.isLoading=true
        })
        builder.addCase(getMovieByName.fulfilled, (state,action)=>{
            state.movie=action.payload
            state.isLoading=false
        })
    }   
})


export default movieSlice.reducer