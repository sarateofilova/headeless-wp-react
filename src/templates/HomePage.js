import React from 'react';
import useHomepageId from "../_includes/useHomepageId";

import PageComponent from "../_includes/PageComponent";
import PageComponents from "../_includes/PageComponents";

function HomePage() {
    const { homepageId, loading } = useHomepageId();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <PageComponent pageId={homepageId} componentName={'component_hero'} />
                    <PageComponents pageId={homepageId} />
                </>
            )}
        </div>
    );
}

export default HomePage;
