import { useState, useEffect } from 'react';
import axios from 'axios';

function useFeaturedImage(featuredImageId) {
    // console.log(featuredImageId)
    const [featuredImage, setFeaturedImage] = useState('');
    const apiUrl = `${window.baseUrl}/wp-json/wp/v2/media/${featuredImageId}`; // Replace with your WordPress site URL

    useEffect(() => {
        if (featuredImageId) {
            axios
                .get(apiUrl)
                .then((response) => {
                    setFeaturedImage(response.data.source_url);
                })
                .catch((error) => {
                    console.error(`Error fetching featured image for post ${featuredImageId}:`, error);
                    setFeaturedImage(''); // Set an empty string in case of an error
                });
        }
    }, [featuredImageId, apiUrl]);

    return featuredImage;
}

export default useFeaturedImage;
