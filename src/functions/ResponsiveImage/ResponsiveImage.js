import React from 'react';
import './ResponsiveImage.scss';
const ResponsiveImage = ({ src, aspectRatio, alt }) => {
    const containerStyle = {
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
    };

    return (
        <figure className="img__responsive img img--cover aspect_16x9" style={containerStyle}>
            <picture>
                <img src={src} alt={alt} />
            </picture>
        </figure>
    );
};

export default ResponsiveImage;
