import { useEffect, useState } from "react";
import { Link } from "react-router";
import useFetchSolution from "../hook/useFetchSolution";

export default function GenresDropdown() {

    const initialUrl = "https://api.rawg.io/api/genres?key=5bc4899075b34f7abef0dcd6efca1bdb"


    // custom hooks
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    const [genres, setGenres] = useState([]);
    // const [error, setError] = useState(null);


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


       
        <div className="dropdown w-100 d-flex justify-content-center py-2 px-0 ">
            <button
                className="btn btn-body-tertiary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Generi
            </button>

            {error && <small className="text-danger">{error}</small>}

            <ul className="dropdown-menu">
                <ul>
                    {genres && genres.map((genre) => (
                        <li key={genre.id}>
                            <Link className="dropdown-item" to={`/games/${genre.slug}`}>{genre.name}</Link>
                        </li>
                    ))}
                </ul>
            </ul>

        </div>
    )
}