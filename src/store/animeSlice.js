import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    anime: [],

};
export const animeSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        addFavoriteAnime: (state, action) => {
            const newAnime = {
                id: state.anime.length === 0 ? 1 : state.anime[state.anime.length - 1].id + 1,
                title: action.payload.title,
                image: action.payload.image,
            }
            state.anime.push(newAnime);
        },
        removeFavoriteAnime: (state, action) => {
            state.anime = state.anime.filter(
                (anime) => anime.id !== action.payload
            );
        }
    },
});

export const { addFavoriteAnime, removeFavoriteAnime } = animeSlice.actions;

export default animeSlice.reducer;