import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SinglePage from "./SinglePage";
import SinglePost from "./SinglePost";
import ArchivePage from "./Archive/ArchivePage";
import ArchivePost from "./Archive/ArchivePost";
function Single() {
    const { slug } = useParams(); // Get the slug from the route
    const [contentData, setContentData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the WordPress API for posts
        const postApiUrl = `http://headless-wp.test/wp-json/custom/v1/posts/${slug}`;
        // Fetch data from the WordPress API for pages
        const pageApiUrl = `http://headless-wp.test/wp-json/custom/v1/pages/${slug}`;

        // First, try to fetch data from the posts endpoint
        axios
            .get(postApiUrl)
            .then(response => {
                const data = response.data;
                setContentData(data);
            })
            .catch(error => {
                // console.error('Error fetching post data:', error);
                // If fetching posts data fails, try fetching pages data
                axios
                    .get(pageApiUrl)
                    .then(response => {
                        const data = response.data;
                        setContentData(data);
                    })
                    .catch(pageError => {
                        console.error('Error fetching page data:', pageError);
                    })
                    .finally(() => {
                        setLoading(false); // Set loading to false when the data is fetched
                    });
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
                    {(() => {
                        switch (true) {
                            case contentData.template === '' && contentData.post_type === 'page':
                                return <SinglePage pageId={contentData.id} />;
                            case contentData.template === '' && contentData.post_type !== 'page':
                                return <SinglePost title={contentData.title} />;
                            case contentData.template === 'archive-page.php':
                                // Handle other template cases here
                                return <ArchivePage pageId={contentData.id} pageSlug={contentData.slug}/>;
                            case contentData.template === 'archive-post.php' :
                                return <ArchivePost pageId={contentData.id} pageSlug={contentData.slug} />
                            default:
                                return null;
                        }
                    })()}
                </>
            )}
        </div>
    );
}

export default Single;
