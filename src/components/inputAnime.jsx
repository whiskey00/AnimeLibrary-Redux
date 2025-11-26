import {useState} from "react";
import {addFavoriteAnime} from "../store/animeSlice.js";
import {useDispatch} from "react-redux";

export const InputAnime = () =>{
    const [newAnime, setNewAnime] = useState("");

    const dispatch = useDispatch();

    const handleAddAnime = () => {
        if (newAnime) {
            dispatch(addFavoriteAnime(newAnime));
            setNewAnime("");
        }
    };

    return(
        <>
        <input onChange={(e) => setNewAnime(e.target.value)} value = {newAnime}/>
        <button onClick={handleAddAnime}>Add Anime</button>
        </>
    )
}