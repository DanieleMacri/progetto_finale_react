import { useState, useContext, useEffect, useCallback } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";

export default function FavoritesProvider({ children }) {
    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);

    const getFavorites = useCallback(async () => {
        if (!session?.user?.id) return;

        const { data: favourites, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session.user.id);

        if (error) {
            console.error("Errore nel recupero dei preferiti:", error);
        } else {
            setFavorites(favourites || []);
        }
    }, [session]);

    const addFavorites = async (game) => {
        const { data, error } = await supabase
            .from("favorites")
            .insert([
                {
                    user_id: session?.user.id,
                    game_id: game.id,
                    game_name: game.name,
                    game_image: game.background_image,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error("Errore nell'aggiunta ai preferiti:", error);
        } else if (data) {
            // Aggiorna subito lo stato locale aggiungendo il nuovo preferito
            setFavorites((prev) => [...prev, data]);
        }
    };

    const removeFavorite = async (game) => {
        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("game_id", game.game_id)
            .eq("user_id", session?.user.id);

        if (error) {
            console.error("Errore nella rimozione dai preferiti:", error);
        } else {
            // Aggiorna subito lo stato locale filtrando via il gioco rimosso
            setFavorites((prev) =>
                prev.filter((fav) => +fav.game_id !== +game.game_id)
            );
        }
    };

    useEffect(() => {
        if (session) {
            getFavorites();
        } else {
            // Svuota i preferiti se l'utente fa logout
            setFavorites([]);
        }
    }, [getFavorites, session]);

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                setFavorites,
                addFavorites,
                removeFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}