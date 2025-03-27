import config from "../../utils/config";
import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";

export default function HomePage() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const initialUrl = "https://api.rawg.io/api/games?key=5bc4899075b34f7abef0dcd6efca1bdb&dates=2024-01-01,2024-12-31&page=1";
    const key = "5bc4899075b34f7abef0dcd6efca1bdb";

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
    }, []);
    return (
        <>
            <div className="container-fluid text-center">
                <h1 className="display-1 my-5">Home</h1>
            </div>


            <div className="grid-games-list container">
                <div className="row justify-content-center">
                    {error && <article>{error}</article>}
                    {data && data.results.map((game) => <CardGame key={game.id} game={game} />)}
                </div>
            </div>
        </>
    )
}