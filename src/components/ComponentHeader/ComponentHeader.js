import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import useHomepageId from "../../_includes/useHomepageId";
import './ComponentHeader.scss';

function ComponentHeader() {
    const [menuData, setMenuData] = useState([]);
    const {homepageId} = useHomepageId();
    const fetchMenuData = async () => {
        try {
            const response = await axios.get('http://headless-wp.test/wp-json/custom/v1/menu/main-menu');
            const menuData = response.data;

            // Set the menu data to the state
            setMenuData(menuData);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    useEffect(() => {
        // Fetch menu data when the component mounts
        fetchMenuData();
    }, []);

    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="nav-menu">
                            <ul>
                                {menuData.map(item => {
                                    // console.log(homepageId); // Log the 'post_id' here
                                    return (
                                        <li key={item.object_id}>
                                            <Link
                                                to={item.object_id === `${homepageId}` ? '/' : `/${item.slug}`}>{item.title}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ComponentHeader;