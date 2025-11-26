import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./animeSlice.js";

export const store = configureStore({
    reducer: {
        anime: animeReducer
    },
});

export default store;
