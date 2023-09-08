import React from 'react';
import ResponsiveImage from "../../functions/ResponsiveImage/ResponsiveImage";

const ComponentHero = ({ component_hero }) => {
    const { title, image } = component_hero;

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>{title}</h2>
                    </div>
                    <div className="col-12">
                        {image.url ? (<ResponsiveImage src={image.url} aspectRatio={16/4} alt={image.alt} />) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ComponentHero;
