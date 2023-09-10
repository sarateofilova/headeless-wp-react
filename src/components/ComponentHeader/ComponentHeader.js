import React from 'react';
import useNavMenu from "../../_includes/useNavMenu";
import './ComponentHeader.scss';

function ComponentHeader() {
    const apiUrl = 'http://headless-wp.test/wp-json/custom/v1/menu/main-menu';
    const menu = useNavMenu({apiUrl});

    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {menu}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ComponentHeader;