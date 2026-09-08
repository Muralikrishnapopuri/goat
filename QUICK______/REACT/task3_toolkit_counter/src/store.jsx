import {configureStore} from '@reduxjs/toolkit';
import CounterReducer from './CounterSlice';
import UserReducerSlice from './UserSlice';
export const storeData = configureStore({

    reducer:{
         count:CounterReducer,
         user:UserReducerSlice
    }
})