import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ACFRenderFlexibleContent from "../_includes/ACFRenderFlexibleContent";
import ACFRenderSingleComponent from "../_includes/ACFRenderSingleComponent";

function SinglePage() {
    const { id } = useParams();
    const [pageContent, setPageContent] = useState('');
    const apiUrl = `http://headless-wp.test/wp-json/wp/v2/pages/${id}`;
    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setPageContent(response.data.content.rendered);
            })
            .catch(error => {
                console.error('Error fetching page content:', error);
            });
    }, [id]);

    return (
        <div>
            <ACFRenderSingleComponent pageId={id} componentName={'component_hero'} ></ACFRenderSingleComponent>
            <ACFRenderFlexibleContent pageId={id}></ACFRenderFlexibleContent>
            <div dangerouslySetInnerHTML={{ __html: pageContent }} />
        </div>
    );
}

export default SinglePage;