import config from "../../utils/config";
import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";
import Particles from "../../components/Particles";

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
            <div className="container-fluid text-center p-0">
                <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                    <Particles
                        particleColors={['#ffffff', '#ffffff']}
                        particleCount={200}
                        particleSpread={10}
                        speed={0.1}
                        particleBaseSize={100}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
                    />

                </div>
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