import { div } from "framer-motion/client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {
    return (
        <div className="image-container d-flex justify-content-center">
            <LazyLoadImage
                className="img-custom"
                effect="blur"
                src={image}
                alt="game image"
                wrapperProps={{
                    style: {
                        transitionDelay: "0.5s",
                    }
                }}
            />
        </div>
    )
}