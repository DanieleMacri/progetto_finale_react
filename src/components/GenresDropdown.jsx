import { useEffect, useState } from "react";

export default function GenresDropdown() {

    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    const initialUrl = "https://api.rawg.io/api/genres?key=5bc4899075b34f7abef0dcd6efca1bdb"

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setGenres(json);
        } catch (error) {
            setError(error.message);
            setGenres(null);
        }
    }


   
    

    useEffect(() => {
        load();
    }, []);

    console.log(genres.results);
    
    return (


        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Generi
            </button>
            {error && <small>{error}</small>}
            <ul className="dropdown-menu">
                {/* {genres && genres.length > 0 ? (
                    genres.map((genre) => (
                        <li key={genre.id}>
                            <Link className="dropdown-item" to="/">
                                {genre.name};
                                
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="dropdown-item ">Nessun genere disponibile</li>
                )} */}
                {genres && genres.results.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    )
}