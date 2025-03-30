import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router";

export default function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(", ");


    const { background_image: image } = game;

    return (
        <>
            <article className="col-11 col-md-3 my-5 m-4 p-0" key={(game.id)}>
                <div className="div-lazy-load-image">
                    <LazyLoadGameImage image={image} />
                </div>
                <div className="div-card-list">
                    <div className="d-flex justify-content-center">
                        <strong className="text-center text-white  my-3">{game.name}</strong>
                    </div>
                    <div className="d-flex justify-content-center">
                        <small className="text-center text-white my-3">{genres}</small>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="text-center text-white my-3">{game.released}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-end w-100 my-2">
                        <button className="rounded-pill button-card-list">
                            <Link className="link-button-card" to={`/games/${game.slug}/${game.id}`}>Info</Link>
                        </button>
                    </div>
                </div>
            </article>
        </>
    )
}