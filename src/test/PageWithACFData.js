import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PageWithACFData({ pageId }) {
    const [acfData, setAcfData] = useState(null);

    useEffect(() => {
        axios.get(`http://headless-wp.test/wp-json/wp/v2/pages/${pageId}`)
            .then(response => {
                setAcfData(response.data.acf); // ACF data is under the "acf" key
            })
            .catch(error => {
                console.error('Error fetching ACF data:', error);
            });
    }, [pageId]);

    if (!acfData) {
        return <div>Loading...</div>;
    }

    const pageComponents = acfData.page_components; // Array of page components
    const title = pageComponents[0].component_cta[0].component_cta.title;
    // console.log(pageComponents[0].component_cta[0].component_cta.title)
    return (
        <div>
            {pageComponents.map((component, index) => (
                <div key={index}>
                    {component.acf_fc_layout === 'component_cta' && (
                        <ComponentCTA data={component.component_cta[index]} />
                    // console.log(component.component_cta[index].component_cta.title)
                    )}
                    {/* Add more cases for other component layouts */}
                </div>
            ))}
        </div>
    );
}

function ComponentCTA({ data }) {
    return (
        <div>
            <h2>{data.component_cta.title}</h2>
            {console.log(data.component_cta.title)}
            {/* Render other fields */}
        </div>
    );
}

export default PageWithACFData;