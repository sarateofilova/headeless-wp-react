import { useEffect, useState } from 'react';
import axios from 'axios';

function useCurrentPageId() {
    const [currentPageId, setCurrentPageId] = useState(null);

    useEffect(() => {
        // Fetch the current page's ID from your WordPress backend
        const fetchCurrentPageId = async () => {
            try {
                const response = await axios.get('https://your-wp-site.com/wp-json/custom/v1/current-page-id');
                setCurrentPageId(response.data.id);
            } catch (error) {
                console.error('Error fetching current page ID:', error);
            }
        };

        fetchCurrentPageId();
    }, []);

    return currentPageId;
}

export default useCurrentPageId;
