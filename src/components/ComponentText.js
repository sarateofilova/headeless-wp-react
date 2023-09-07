import React from "react";

const RenderHTMLContent = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

const ComponentText = ({ component_text }) => (
    <div>
        {/*<p>{component_text.text}</p>*/}
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <RenderHTMLContent htmlContent={component_text.text} />
                </div>
            </div>
        </div>
    </div>
);

export default ComponentText;