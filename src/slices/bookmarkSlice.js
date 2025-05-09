import {createSlice} from '@reduxjs/toolkit'

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState : [],
    reducers : {
        addBookmark: (state, action) => {
            state.push(action.payload)
        },

        removeBookmark: (state, action) => {
            return state.filter(post => post.id !== action.payload)
        }
    }
})

export const {addBookmark, removeBookmark} = bookmarkSlice.actions
export default bookmarkSlice.reducer