import LazyLoadGameImage from "./LazyLoadGameImage";

export default function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(", ");
    

    const { background_image: image } = game;

    return (
        <>
            <article className="col-3 m-4 p-0 card-custom" key={(game.id)}>
                <LazyLoadGameImage image={image} />
                <div className="d-flex flex-column justify-content-center">
                    <strong className="text-center my-2">{game.name}</strong>
                    <small className="text-center my-2">{genres}</small>
                    <p className="text-center my-2">{game.released}</p>
                    <div className="d-flex justify-content-center my-2">
                        <button className="rounded-pill button-card-list">Info</button>
                    </div>
                </div>
            </article>
        </>
    )
}