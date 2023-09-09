import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageComponent from '../../_includes/PageComponent';
import ComponentCards from "../../components/ComponentCards/ComponentCards";

function ArchivePost({pageId}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch data from the WordPress REST API endpoint for posts
        axios
            .get('http://headless-wp.test/wp-json/wp/v2/posts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
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
                <>
                    <PageComponent pageId={pageId} componentName={'component_hero'} />
                    <ComponentCards postType={'posts'}/>
                </>

            )}
            <ul>
                {posts.map((post) => {
                    return (
                        <>
                            <div className="page-list">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-4">
                                            <div key={post.id}>
                                                <li>
                                                    <Link to={`/${post.slug}`}>{post.title.rendered}</Link>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </ul>
        </div>
    );
}

export default ArchivePost;