import { useEffect } from "react"
import { useParams } from "react-router";
import CardGame from "../../components/CardGame";


export default function GamePage() {

    const { id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=9269195f491e44539d7a2d10ce87ab15`;

    const load = async () => {
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message)
            setData(null);
        }
    };

    useEffect(() => {
        load();
    }, [id]);


    return (
        <>
            <div>
                <h1>Benvenuto in {id}</h1>
                {error && <h2>{error}</h2>}
                {data && data.results.map((game) => <CardGame key={game.id} game={game} />)}
            </div>
        </>
    )
}