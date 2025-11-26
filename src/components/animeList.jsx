import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {removeFavoriteAnime} from "../store/animeSlice.js";

export const AnimeList = () => {
    const anime = useSelector((state) => state.anime.anime);
    const dispatch = useDispatch();

    const handleRemoveAnime = (id) => {
        dispatch(removeFavoriteAnime(id));
    };
    
    return(
        <div>
            <h1>Anime Library</h1>
            {anime.map((anime) => (
                <div key={anime.id}>{anime.title} <button onClick ={()=> handleRemoveAnime(anime.id)} >Remove Anime</button></div>
            ))}
        </div>
    );
};