import { useEffect } from "react"
import { useParams } from "react-router";
import PixelTransition from '../../components/PixelTransition';
import useFetchSolution from "../../hook/useFetchSolution";
import "./style.css"


export default function GamePage() {

    const { id } = useParams();

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=9269195f491e44539d7a2d10ce87ab15`;

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
            setError(error.message)
            setData(null);
        }
    };

    useEffect(() => {
        load();
    }, [id]);


    return (
        <>
            <div className="container-fluid d-flex flex-column align-items-center main-custom">
                <div className=" text-center col-12 col-md-6">
                    {error && <h1>{error}</h1>}
                    <div className="style-gamepage">
                        <div className="style-game-info">
                            <p className="text-white">{data && data.released}</p>
                            <h1 className="text-white">{data && data.name}</h1>
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
                                                >Voto: {data && data.rating}</p>
                                            </div>
                                        </div>

                                    }
                                    gridSize={12}
                                    pixelColor='#ffffff'
                                    animationStepDuration={0.4}
                                    className="custom-pixel-card"
                                />
                                <div className="d-flex justify-content-center mt-3">
                                    <p className="text-white">Vuoi sapere il mio voto?</p>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <p className="text-white">Porta il mouse sull'immagine</p>
                                </div>
                            </div>
                            {/* <p>Voto: {data && data.rating}</p> */}
                            <p className="text-white">Descrizione:</p>
                            <p className="text-white">{data && data.description_raw}</p>
                        </div>
                        <div className="style.game-image">
                            {/* <img src={data && data.background_image} alt="Immagine videogioco" /> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}