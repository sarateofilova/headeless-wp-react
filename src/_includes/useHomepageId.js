import { useEffect, useState } from 'react';
import axios from 'axios';

function useHomepageId() {
    const [homepageId, setHomepageId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use the slug to fetch homepage ID data
        const apiUrl = `${window.baseUrl}/wp-json/custom/v1/homepage-id`;

        axios
            .get(apiUrl)
            .then((response) => {
                setHomepageId(response.data.homepage_id);
            })
            .catch((error) => {
                console.error('Error fetching homepage ID:', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when the data is fetched
            });
    }, []);

    return { homepageId, loading };
}

export default useHomepageId;
