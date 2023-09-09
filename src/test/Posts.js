import React, { useState, useEffect } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const apiEndpoint = 'http://headless-wp.test/wp-json/wp/v2/posts';

        // Fetch data using the fetch API
        fetch(apiEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                setError(error); // Set error state if fetch fails
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to run effect only once


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>WordPress Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title.rendered}</li>
                ))}
            </ul>
        </div>
    );
}

export default Posts;
