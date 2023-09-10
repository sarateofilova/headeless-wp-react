import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import useHomepageId from '../../_includes/useHomepageId';
import './ComponentHeader.scss';

function ComponentHeader() {
    const [menuData, setMenuData] = useState([]);
    const { homepageId } = useHomepageId();
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
                        <MenuComponent menuData={menuData} homepageId={homepageId} />
                    </div>
                </div>
            </div>
        </header>
    );
}

function MenuComponent({ menuData, homepageId }) {
    // Create a mapping of parent items by their ID
    const parentItemMap = {};
    menuData.forEach((menuItem) => {
        if (menuItem.menu_item_parent !== '0') {
            const parentId = menuItem.menu_item_parent;
            if (!parentItemMap[parentId]) {
                parentItemMap[parentId] = [];
            }
            parentItemMap[parentId].push(menuItem);
        }
    });

    // Function to recursively render menu items with their children
    function RenderMenuItem(menuItem, customItemClass, customLinkClass) {
        const location = useLocation();

        const hasChildren = (parentItemMap[menuItem.ID] && parentItemMap[menuItem.ID].length > 0) ?? false;
        const isSubMenu = (menuItem.menu_item_parent !== '0');
        const itemClassName = hasChildren ? `menu-item has-children` : `${customItemClass ?? 'menu-item'}`;
        const linkClassName = isSubMenu ? 'sub-menu-item-link' : `${customLinkClass ?? 'menu-item-link'}`;
        const activeClass = (location.pathname === `/${menuItem.slug}` ? 'active' : '');

        return (
            <li className={`${itemClassName} ${activeClass}`} key={menuItem.ID}>
                <Link
                    to={menuItem.object_id === `${homepageId}` ? '/' : `/${menuItem.slug}`}
                    className={linkClassName}
                >
                    {menuItem.title}
                </Link>
                {hasChildren && (
                    <ul className="sub-menu">
                        {parentItemMap[menuItem.ID].map((childItem) => RenderMenuItem(childItem, 'sub-menu-item', 'sub-menu-link'))}
                    </ul>
                )}
            </li>
        );
    }


    // Render top-level menu items (items without a parent)
    const topLevelMenuItems = menuData.filter((menuItem) => menuItem.menu_item_parent === '0');

    return (
        <div>
            <ul className="nav-menu">
                {topLevelMenuItems.map((menuItem) => RenderMenuItem(menuItem))}
            </ul>
        </div>
    );
}

export default ComponentHeader;