import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageComponent from '../../_includes/PageComponent';

function ArchivePage({pageId}) {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch data from the WordPress REST API endpoint for pages
        axios
            .get('http://headless-wp.test/wp-json/wp/v2/pages')
            .then((response) => {
                setPages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching pages:', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when the data is fetched
            });

    }, []);
    return (
        <div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <PageComponent pageId={pageId} componentName={'component_hero'} />
            )}
            <ul>
                {pages.map((page) => {
                    return (
                        <div key={page.id}>
                            <li>
                                <Link to={`/${page.slug}`}>{page.title.rendered}</Link>
                            </li>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}

export default ArchivePage;