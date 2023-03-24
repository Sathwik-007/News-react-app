import {createSlice } from "@reduxjs/toolkit";

const uislice = createSlice({
    name: "ui",
    initialState: {
        isLoggedIn: false,
        userAddress: "",
        showPostArticleButton: false,
    },
    reducers: {
        userLoggedIn(state) {
            isLoggedIn = !isLoggedIn;
            /* useraddress should be set from app */
            //
            showPostArticleButton = !showPostArticleButton;
        }
    }
});

export const uiactions = uislice.actions;

export default uislice;