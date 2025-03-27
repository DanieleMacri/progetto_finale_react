import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({image}) {
    return (
        <LazyLoadImage
            className="img-custom img-fluid"
            effect="blur"
            src={image}
            alt="game image"
            wrapperProps={{
                style: {
                    transitionDelay: "0.5s",
                }
                }}
        />
    )
}