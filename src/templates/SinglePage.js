import React from 'react';
import PageComponent from "../_includes/PageComponent";
import PageComponents from "../_includes/PageComponents";

function SinglePage({pageId}) {
    return (
        <div>
            <>
                <div className="single-page">
                    <PageComponent pageId={pageId} componentName={'component_hero'} />
                    <PageComponents pageId={pageId} />
                </div>
            </>
        </div>
    );
}

export default SinglePage;