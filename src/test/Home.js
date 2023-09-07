import React from 'react';

function Home({ pageData }) {
    const { title, featured_media } = pageData;
    console.log(pageData)

    return (
        <div>
            <h1>{title && title.rendered}</h1>
            {featured_media && (
                <img
                    src={featured_media.source_url}
                    alt={featured_media.alt_text}
                    width={featured_media.media_details.width}
                    height={featured_media.media_details.height}
                />
            )}
        </div>
    );
}

export default Home;