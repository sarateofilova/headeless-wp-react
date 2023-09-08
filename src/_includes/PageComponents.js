import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ComponentCTA from '../components/ComponentCTA/ComponentCTA';
import ComponentText from '../components/ComponentText';

const PageComponents = ({ pageId }) => {
    const [pageComponents, setPageComponents] = useState([]);
    useEffect(() => {
        axios.get(`http://headless-wp.test/wp-json/wp/v2/pages/${pageId}`)
            .then(response => {
                setPageComponents(response.data.acf.page_components);
            })
            .catch(error => {
                console.error('Error fetching ACF data:', error);
            });
    }, [pageId]);

    return (
        <div>
            {pageComponents && Array.isArray(pageComponents) ? (
                pageComponents.map((component, index) => {
                    const layoutName = component.acf_fc_layout;

                    if (!layoutName) {
                        return null; // Skip components without layout name
                    }

                    const specificComponentData = component[layoutName];

                    if (!specificComponentData || specificComponentData.length === 0) {
                        return null; // Skip components with undefined or empty data
                    }

                    const LayoutComponent = componentTypeToComponentMap[layoutName];
                    if (LayoutComponent) {
                        return <LayoutComponent key={index} {...specificComponentData[0]} />;
                    }

                    return null;
                })
            ) : null }
        </div>
    );
};

const componentTypeToComponentMap = {
    component_cta: ComponentCTA,
    component_text: ComponentText,
    // Add more entries for other component types...
};

export default PageComponents;