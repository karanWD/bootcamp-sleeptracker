import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addItem:(state,action) => {
            state.list = [...state.list,action.payload]
        },
        removeItem:(state,action)=>{
            let res = state.list.filter(item=>item.id!==action.payload)
            state.list = res
        },
        editItem : (state,action)=>{
            let editedItem = state.list.find(item=>item.id===action.payload.id)
            editedItem.sleep=action.payload.times.sleep
            editedItem.wakeUp=action.payload.times.wakeUp
        }

    },
})

export const {addItem,removeItem,editItem} = listSlice.actions

export default listSlice.reducer