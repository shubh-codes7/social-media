import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    return response.json()
    
})

const postSlice = createSlice({
    name: "post",
    initialState : {
        isLoading: false,
        isError: false,
        data : null
    },
    extraReducers: (builder) => {

        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })

        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            console.log("Error ", action.payload)
        })
    }
})

export default postSlice.reducer;