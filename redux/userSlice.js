import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers=createAsyncThunk("getUsers",async()=>{
    const {data}=await axios.get('https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?select=*',{
        headers:{
            apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
        }
    })

    return data
})

export const getCurrentUser=createAsyncThunk("getCurrentUser", async(userId)=>{
    const {data}=await axios.get('https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?select=*',{
        headers:{
            apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
        }
    })

    const user=data.find((user)=>user.id==userId)
    return user
})

    export const getWatchList=createAsyncThunk("getWatchList", async(userId)=>{
        const {data}=await axios.get(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?id=eq.${userId}&select=*`,{
            headers:{
              apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
              Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
            }
          })
          const wlist=data[0].watchList
          return wlist
    })

// export const addToWatchList=createAsyncThunk('addToWatchList', async(wl, movie, userId)=>{
//     const data={
//       watchlist:[...wl, movie]
//     }

//     await axios.patch(`https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Users?id=eq.${userId}&select=*`, data,{
//       headers:{
//         apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
//         Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
//         "Content-Type": "application/json"
//       }
//     })
//   })



export const userSlice=createSlice({
    name:"user",
    initialState:{
        isLoggedIn:localStorage.getItem('isLoggedIn')?JSON.parse(localStorage.getItem('isLoggedIn')):false,
        users:[],
        user:{},
        watchList:[],
        isLoadingWatchList:false
    },
    reducers:{
        setIsLoggedIn:(state,action)=>{
            state.isLoggedIn=!state.isLoggedIn
            localStorage.setItem('isLoggedIn',state.isLoggedIn)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.fulfilled, (state, action)=>{
            state.users=action.payload
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action)=>{
            state.user=action.payload
        })
        builder.addCase(getWatchList.fulfilled, (state, action)=>{
            state.watchList=action.payload
        })
    }
})

export const {setIsLoggedIn}=userSlice.actions

export default userSlice.reducer