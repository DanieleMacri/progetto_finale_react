import { useContext } from "react";

import FavoritesContext from "../context/FavoritesContext";



export default function ToggleFavorite({ data }) {

    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);
    console.log(favorites);

   
    if (!data || !data.id) {
        console.error("Errore: 'data' o 'data.id' non esiste.", data);
        return null; 
    }

    const isFavorite = (id) => {
        if (!Array.isArray(favorites)) {
            console.error("Errore: 'favorites' non è un array.", favorites);
            return false;
        }
        // Confronta id con game_id
        return favorites.some((fav) => fav && +fav.game_id === +id);
    };

    
    // const handleToggleFavorite = () => {
    //     if (isFavorite(data.id)) {
    //         removeFavorite(data);
    //     } else {
    //         addFavorites(data);
    //     }
    // };

    const handleToggleFavorite = () => {
        if (isFavorite(data.id)) {
            const favoriteToRemove = favorites.find(fav => +fav.game_id === +data.id);
            if (favoriteToRemove) {
                removeFavorite(favoriteToRemove); // ✅ Passi l'oggetto corretto con `game_id`
            }
        } else {
            addFavorites(data); // questo va ancora bene
        }
    };
    
    
    return (
        <div>
            <button className="button-favorite" onClick={handleToggleFavorite}>
                <i
                    className={`fa-${isFavorite(data.id) ? "solid" : "regular"} fa-heart fa-lg text-white`}
                ></i>
            </button>
        </div>
    )


}
