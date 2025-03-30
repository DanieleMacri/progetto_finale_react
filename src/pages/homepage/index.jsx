import config from "../../utils/config";
import { useEffect, useState } from "react";
import CardGame from "../../components/CardGame";
import Particles from "../../components/Particles";
import useFetchSolution from "../../hook/useFetchSolution";
import "./style.css";

export default function HomePage() {

    const initialUrl = "https://api.rawg.io/api/games?key=5bc4899075b34f7abef0dcd6efca1bdb&dates=2024-01-01,2024-12-31&page=1";

    // custom hooks
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

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
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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


            <div className="grid-games-list container-fluid">
                <div className="row justify-content-center m-0">
                    {error && <article>{error}</article>}
                    {data && data.results.map((game) => <CardGame key={game.id} game={game} />)}
                </div>
            </div>
        </>
    )
}