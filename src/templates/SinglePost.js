import React from 'react';

function SinglePost({title}) {
    return (
        <div>
            <>
                <div className="single-post">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <h2>{title}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

export default SinglePost;