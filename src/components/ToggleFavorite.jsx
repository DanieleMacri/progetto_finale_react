import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";


export default function ToggleFavorite({ data }) {

    // const { session } = useContext(SessionContext);

    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);

    const isFavorite = () => favorites.find((el) => +el.game_id === data.id);
    
    // const { addFavorites, removeFavorite } = useContext(FavoritesContext);


    // const addFavorite = async (game) => {
    //     const { data, error } = await supabase
    //         .from('favorites')
    //         .insert([
    //             {
    //                 user_id: session?.user.id,
    //                 game_id: game.id,
    //                 game_name: game.name,
    //                 game_image: game.background_image,
    //             },
    //         ])
    //         .select();
    //     if (error) {
    //         alert(error)
    //     } else {
    //         setFavorites(data);
    //     }
    // };
    // const addFavorites = async (game) => {
    //     await supabase
    //       .from("favorites")
    //       .insert([
    //         {
    //           user_id: session?.user.id,
    //           game_id: game.id,
    //           game_name: game.name,
    //           game_image: game.background_image,
    //         },
    //       ])
    //       .select();
    //   };

    // const removeFavorite = async (game) => {
    //     const { error } = await supabase
    //         .from('favorites')
    //         .delete()
    //         .eq('game_id', game.id)
    //         .eq('user_id', session?.user.id)
    //     if (error) {
    //         alert(error)
    //     } else {
    //         setFavorites((prev) =>
    //             prev.filter(
    //                 (el) => el.game_id !== game.id && el.user_id !== session?.user.id
    //             )
    //         );
    //     }
    // // };
    // const removeFavorite = async (game) => {
    //     await supabase
    //       .from("favorites")
    //       .delete()
    //       .eq("game_id", game.id)
    //       .eq("user_id", session?.user.id);
    //   };

    return (
        <div>
            {isFavorite() ? (
                <button className="button-favorite" onClick={() => removeFavorite(data)}><i className="fa-regular fa-heart fa-lg text-white"></i></button>)
                : (
                    <button className="button-favorite" onClick={() => addFavorites(data)}><i className="fa-solid fa-heart fa-lg text-white"></i></button>
                )
            }
        </div>
    )
}
