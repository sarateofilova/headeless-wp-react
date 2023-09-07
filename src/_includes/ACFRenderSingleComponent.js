import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComponentHero from "../components/ComponentHero/ComponentHero";
import ComponentCTA from "../components/ComponentCTA/ComponentCTA";

const componentMap = {
    component_hero: ComponentHero,
    component_cta : ComponentCTA
    // Add more entries for other component types...
};

const ACFRenderSingleComponent = ({ pageId, componentName }) => {
    console.log(pageId)
    const [acfData, setAcfData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch ACF data using the pageId
        fetchData(pageId);
    }, [pageId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://headless-wp.test/wp-json/wp/v2/pages/${pageId}`);

            setAcfData(response.data.acf);

            setLoading(false);


        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const SingleComponent = componentMap[componentName];

    return SingleComponent && acfData && acfData[componentName] ? (
        <SingleComponent {...acfData[componentName][0]} />
    ) : null;
};

export default ACFRenderSingleComponent;
