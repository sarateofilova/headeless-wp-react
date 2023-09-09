import ResponsiveImage from "../../functions/ResponsiveImage/ResponsiveImage";
import React from "react";
import useFeaturedImage from "../../_includes/useFeaturedImage";
import {Link} from "react-router-dom";

function Card({ featuredImageId, title, excerpt, postSlug }) {
    const img = useFeaturedImage(featuredImageId);
    return (
        <div className="col-4">
            <Link to={`/${postSlug}`} className={'component-cards__link'}>
                <h3>{title}</h3>
                {img ? <ResponsiveImage src={img} aspectRatio={16 / 4} alt={title} /> : null}
                <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
            </Link>
        </div>
    )
}
export default Card

