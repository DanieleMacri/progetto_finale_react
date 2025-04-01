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


       
        <div className="dropdown w-100 d-flex justify-content-start align-items-center ps-5 px-0 ">
            <button
                className="button-genres-dropdown mt-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <p className=""><i class="fa-solid fa-bars fa-lg text-black"></i> Generi</p> 
            </button>

            {error && <small className="text-danger">{error}</small>}

            <ul className="dropdown-menu">
                <ul className="list-group list-dropdown">
                    {genres && genres.map((genre) => (
                        <li key={genre.id} className="">
                            <Link className="dropdown-item my-0 py-0" to={`/games/${genre.slug}`}>{genre.name}</Link>
                            <hr class="dropdown-divider"></hr>
                        </li>
                        
                    ))}
                </ul>
            </ul>

        </div>
    )
}