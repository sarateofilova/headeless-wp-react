import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import './ComponentCards.scss';

function ComponentCards({ postType, currentPageId, currentPageSlug }) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2); // Number of items to display per page

    // Calculate the indices for the items to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

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

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // navigate(`/${currentPageSlug}/${pageNumber}`);
    };

    return (
        <div className="component-cards">
            <div className="container">
                <div className="row">
                    {currentPosts.map((post) => (
                        <Card
                            key={post.id}
                            featuredImageId={post.featured_media}
                            title={post.title.rendered}
                            excerpt={post.excerpt.rendered}
                            postSlug={post.slug}
                        />
                    ))}
                </div>
            </div>
            <div className="pagination">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComponentCards;
