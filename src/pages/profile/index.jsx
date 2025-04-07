import { useContext } from "react"
import SessionContext from "../../context/SessionContext"
import FavoritesContext from "../../context/FavoritesContext"



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
            <h1 className="text-white mt-4">Ciao {session?.user.user_metadata.first_name}!</h1>
            <h2 className="text-white mb-3">Ecco la lista dei tuoi giochi preferiti:</h2>

            <div className="col-11 col-md-8 main-custom">

                {favorites.length == 0 && <p>Non hai ancora aggiunto giochi ai tuoi favoriti.</p>}
                <ul className="w-100">
                    {favorites.map((game) => (
                        <li key={game.id} style={favoriteUI}>
                            <div className="d-flex align-items-center my-3">
                                <img width={150} height={100} src={game.game_image} className="rounded-3" alt="Immagine gioco preferito" />
                                <p className="text-white ms-5">{game.game_name}</p>
                            </div>
                            
                            <button className="bg-danger rounded-circle py-1 px-2 border-white text-white" onClick={() => removeFavorite(game)}>
                                <i className="fa-solid fa-x fa-lg"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
    
}
