import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    anime: [
        {id: 1, title: "Naruto"},
        {id: 2, title: "One Piece"},
        {id: 3, title: "Attack on Titan"}
    ],

};
export const animeSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        addFavoriteAnime: (state, action) => {
            const newAnime = {
                id: state.anime[state.anime.length - 1] + 1,
                title: action.payload,
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