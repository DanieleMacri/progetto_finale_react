import { useContext } from "react"
import SessionContext from "../../context/SessionContext"
import FavoritesContext from "../../context/FavoritesContext"
import { div, p } from "framer-motion/client";


const favoriteUI = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

}

export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <div className="container-fluid main-custom min-vh-100 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-white">Ciao {session?.user.user_metadata.first_name}!</h1>
            <h2 className="text-white">Ecco la lista dei tuoi giochi preferiti:</h2>

            
            {favorites.length == 0 && <p>Non hai ancora aggiunto giochi ai tuoi favoriti.</p>}
            <ul className="">
                {favorites.map((game) => (
                    <li key={game.id} style={favoriteUI}>
                        <div className="d-flex align-items-center">
                            <img width={100} height={100} src={game.game_image} alt="Immagine gioco preferito" />
                            <p>{game.game_name}</p>
                        </div>
                        <button className="secondary" onClick={() => removeFavorite(game.game_id)}>
                            Rimuovi
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}