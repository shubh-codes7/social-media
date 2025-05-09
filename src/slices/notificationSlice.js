import {createSlice} from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState : [],
    reducers: {
        addNotification : (state, action) => {
            state.unshift(`Post with Id ${action.payload.id} ${action.payload.action} at ${action.payload.time}`)
        }
    }

})

export const {addNotification} = notificationSlice.actions
export default notificationSlice.reducer