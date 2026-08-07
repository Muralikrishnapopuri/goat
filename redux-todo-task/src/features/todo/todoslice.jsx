import {createSlice , createAsyncThunk} from '@redux/toolkit';

import axios from 'axios';


// export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
//   const res = await axios.get(
//     'https://jsonplaceholder.typicode.com/todos?_limit=5'
//   );
//   return res.data; // becomes action.payload in the fulfilled case
// });

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async ()=>{
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    return res.data ;

});


const todoReducer = createSlice({
    name : "todo",
    initialState : {
        items : [],
        status : "idle",
        error : null
    },
    Reducers : {
        addtodo : (state , action)=>{
            state.items.push({
                id : Date.now(),
            title : action.payload,
            completed : false
            }
            )
        },
        toggletodo : (state, action)=>{
            id : 
        }
    }
})