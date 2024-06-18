'use client'
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import personReducer  from "./personSlice";
import userReducer from "./userSlice";

export const store=configureStore({
    reducer:{
        movie:movieReducer,
        person:personReducer,
        user:userReducer
    }
})