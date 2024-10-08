import React, { useEffect } from "react";

const PrintImage = ({ imageUrl }) => {
    useEffect(() => {
        // Trigger print dialog once the component is mounted
        window.print();
    }, []);

    return (
        <div style={{ display: "none" }}>
            {/* This image will be printed */}
            <img src={imageUrl} alt="Printable Image" />
        </div>
    );
};

export default PrintImage;
