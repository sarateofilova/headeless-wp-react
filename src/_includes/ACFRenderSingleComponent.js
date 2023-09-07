import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComponentHero from "../components/ComponentHero/ComponentHero";
import ComponentCTA from "../components/ComponentCTA/ComponentCTA";

const componentMap = {
    component_hero: ComponentHero,
    component_cta: ComponentCTA
    // Add more entries for other component types...
};

const ACFRenderSingleComponent = ({ pageId, componentName }) => {
    const [acfData, setAcfData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get(`http://headless-wp.test/wp-json/wp/v2/pages/${pageId}`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                setAcfData(response.data.acf);
            })
            .catch(err => {
                console.error('Error fetching ACF data:', err);
                setError(err); // Set error state with more details
            })

    }, [pageId]);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const SingleComponent = componentMap[componentName];

    if (SingleComponent && acfData && acfData[componentName]) {
        const componentData = acfData[componentName][0];
        return <SingleComponent {...componentData} />;
    }

    return null;
};

export default ACFRenderSingleComponent;
