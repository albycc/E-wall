import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messageText:"",
        visible:false,
        messageType:"default",
        timer:null
    },
    reducers:{
        setMessage:(state, {payload}) => {
            state.visible = true;
            state.messageText = payload.messageText;
            state.messageType = payload.messageType;
        },
        hideMessage:(state) => {
            state.visible = false;
            state.messageText = "";
            state.messageType = "default";
        }
    }
})

export const {setMessage, hideMessage} = messageSlice.actions

export default messageSlice.reducer