import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "./Card";
import "./ComponentCards.scss";

function ComponentCards(postType) {
    console.log(postType.postType)
    const [posts, setPosts] = useState([]);

    // console.log(img)

    const apiUrl = `${window.baseUrl}/wp-json/wp/v2/posts`; // Replace with your WordPress site URL
    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching WordPress posts:', error);
            });
    }, [apiUrl]);

    return (
        <div className="component-cards">
            <div className="container">
                <div className="row">
                    {posts.map((post) => {
                        console.log(post)
                        return(
                            <Card featuredImageId={post.featured_media} title={post.title.rendered} excerpt={post.excerpt.rendered} postSlug={post.slug}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default ComponentCards;
