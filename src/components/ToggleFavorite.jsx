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

    

    // Funzione toggle per aggiungere o rimuovere dai preferiti
    const handleToggleFavorite = () => {
        if (isFavorite(data.id)) {
            removeFavorite(data);
        } else {
            addFavorites(data);
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
