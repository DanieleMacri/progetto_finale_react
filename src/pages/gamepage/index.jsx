import { useEffect, useState } from "react"
import { useParams } from "react-router";
import PixelTransition from '../../components/PixelTransition';


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
                {/* <h1>Benvenuto in {id}</h1> */}
                {error && <h1>{error}</h1>}
                <div className="style-gamepage">
                    <div className="style-game-info">
                        <p>{data && data.released}</p>
                        <h1>{data && data.name}</h1>
                        <p>Voto: {data && data.rating}</p>
                        <p>Descrizione:</p>
                        <p>{data && data.description_raw}</p>
                    </div>
                    <div className="style.game-image">
                        <img src={data && data.background_image} alt="Immagine videogioco" />
                        <div className="d-flex flex-column justify-content-center align-items-center my-3">

                            <PixelTransition
                                firstContent={
                                    <img
                                        src={data && data.background_image}
                                        alt="Immagine videogioco"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                }
                                secondContent={
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "grid",
                                            placeItems: "center",
                                            backgroundColor: "#111"
                                        }}
                                    >
                                        <div className="m-5">
                                            <p className="text-center"
                                            // style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}
                                            >{data && data.name}</p>
                                        </div>
                                    </div>

                                }
                                gridSize={12}
                                pixelColor='#ffffff'
                                animationStepDuration={0.4}
                                className="custom-pixel-card"
                            />
                            <div className="d-flex justify-content-center my-3">
                                <p>Cliccami!</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {data && data.results.map((game) => <CardGame key={game.id} game={game} />)} */}
            </div>
        </>
    )
}