import {configureStore} from '@reduxjs/toolkit'
import postSlice from '../slices/postSlice.js'
import bookmarkSlice from '../slices/bookmarkSlice.js'

export const store = configureStore({
    reducer: {
        post: postSlice,
        bookmark : bookmarkSlice,
    }
})

