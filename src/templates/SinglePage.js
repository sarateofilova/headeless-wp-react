import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ACFRenderSingleComponent from "../_includes/ACFRenderSingleComponent";
import ACFRenderFlexibleContent from "../_includes/ACFRenderFlexibleContent";

function SinglePage() {
    const { slug } = useParams(); // Get the slug from the route

    const [pageData, setPageData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use the slug to fetch page data
        const apiUrl = `http://headless-wp.test/wp-json/custom/v1/pages/${slug}`;
        axios.get(apiUrl)
            .then(response => {
                const data = response.data;
                setPageData(data);
            })
            .catch(error => {
                console.error('Error fetching page data:', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when the data is fetched
            });
    }, [slug]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ACFRenderSingleComponent pageId={pageData.id} componentName={'component_hero'} />
                    <ACFRenderFlexibleContent pageId={pageData.id} />
                </>
            )}
        </div>
    );
}

export default SinglePage;