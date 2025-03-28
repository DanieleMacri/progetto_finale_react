import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function GenresDropdown() {

    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null);

    const initialUrl = "https://api.rawg.io/api/genres?key=5bc4899075b34f7abef0dcd6efca1bdb"

    // const load = async () => {
    //     try {
    //         const response = await fetch(initialUrl);
    //         if (!response.ok) {
    //             throw new Error(response.statusText);
    //         }
    //         const json = await response.json();
    //         setGenres(json);
    //     } catch (error) {
    //         setError(error.message);
    //         setGenres(null);
    //     }
    // }

    // useEffect(() => {
    //     load();
    // }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(`Errore: ${response.statusText}`);
            }
            const data = await response.json();
            setGenres(Array.isArray(data.results) ? data.results : []); // Fallback se results è undefined
        } catch (error) {
            setError(error.message);
            setGenres([]); // Evita errori impostando sempre un array
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    return (


        // <div className="dropdown">
        //     <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        //         Generi
        //     </button>
        //     {error && <small>{error}</small>}
        //     <ul className="dropdown-menu">
        //         {/* {genres && genres.length > 0 ? (
        //             genres.map((genre) => (
        //                 <li key={genre.id}>
        //                     <Link className="dropdown-item" to="/">
        //                         {genre.name};
                                
        //                     </Link>
        //                 </li>
        //             ))
        //         ) : (
        //             <li className="dropdown-item ">Nessun genere disponibile</li>
        //         )} */}
        //         {genres && genres.results.map((genre) => (
        //             <li key={genre.id}>{genre.name}</li>
        //         ))}
        //     </ul>
        // </div>
        <div className="dropdown d-flex justify-content-center bg-danger py-3">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Generi
            </button>

            {error && <small className="text-danger">{error}</small>}

            <ul className="dropdown-menu">
                {genres?.length > 0 ? (
                    genres.map((genre) => (
                        <li key={genre.id}>
                            <Link className="dropdown-item" to={`/genre/${genre.id}`}>
                                {genre.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="dropdown-item text-muted">Nessun genere disponibile</li>
                )}
            </ul>
            
        </div>
    )
}