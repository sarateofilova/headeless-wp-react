import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetCurrentPageId = ({ children }) => {
    const [currentPageId, setCurrentPageId] = useState(null);

    useEffect(() => {
        // Fetch the current page or post ID from WordPress
        const fetchCurrentPageId = async () => {
            try {
                const response = await axios.get('http://headless-wp.test/wp-json/wp/v2/pages?filter[orderby]=date&order=desc');
                if (response.data && response.data.length > 0) {
                    setCurrentPageId(response.data[0].id); // Assuming the latest page is the current one
                }
            } catch (error) {
                console.error('Error fetching current page ID:', error);
            }
        };

        fetchCurrentPageId();
    }, []);

    return (
        <>{children(currentPageId)}</>
    );
};

export default GetCurrentPageId;
