import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ACFRenderSingleComponent from "../_includes/ACFRenderSingleComponent";
import ACFRenderFlexibleContent from "../_includes/ACFRenderFlexibleContent";

function PageArchive() {
    const [pages, setPages] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get('http://headless-wp.test/wp-json/wp/v2/pages')
            .then(response => {
                setPages(response.data);
            })
            .catch(error => {
                console.error('Error fetching pages:', error);
            });
        console.log(id)
    }, []);

    return (
        <div>
            <ACFRenderSingleComponent pageId={'64'} componentName={'component_hero'} />
            <ul>
                {pages.map(page => (
                    <div key={page.id}>

                        <li>
                            <Link to={`/page/${page.id}`}>{page.title.rendered}</Link>
                        </li>

                    </div>
                ))}
            </ul>
        </div>
    );
}

export default PageArchive;
