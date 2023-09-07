import React from 'react';
import './ComponentCTA.scss';
import ResponsiveImage from "../../functions/ResponsiveImage/ResponsiveImage";

const ComponentCTA = ({ component_cta }) => {
    const { title, image } = component_cta;

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>{title}</h2>
                    </div>
                    <div className="col-4">
                        {image.url ? (<ResponsiveImage src={image.url} aspectRatio={16/9} alt={title} />) : null}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ComponentCTA;