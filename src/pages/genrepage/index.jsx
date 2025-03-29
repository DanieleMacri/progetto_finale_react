import { useParams } from "react-router"
import { useState, useEffect } from "react"
import CardGame from "../../components/CardGame";

export default function GenrePage() {
    
    const {genre} = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&genres=${genre}&page=1`;

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
    }

    useEffect(() => {
        load();
    }, [genre]);

    return (
        <>
        <div>
            <h1>Benvenuto in {genre}</h1>
            {error && <p>{error}</p>}
            {data && data.results.map((game) => <CardGame key={game.id} game={game} />)}
        </div>
        </>
    )
}