import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllPersons=createAsyncThunk("getAllPersons", async()=>{
    const response=await fetch('https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies-Persons?select=*',{
        method:"GET",
        headers:{
            apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs'
        }
    })

    const jsonData=response.json()
    return jsonData

})

export const personSlice=createSlice({
    name:"person",
    initialState:{
        isLoadingPerson:false,
        persons:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllPersons.pending, (state)=>{
            state.isLoadingPerson=true
        })
        builder.addCase(getAllPersons.fulfilled, (state,action)=>{
            state.persons=action.payload
            state.isLoadingPerson=false
        })
    }
})

export default personSlice.reducer