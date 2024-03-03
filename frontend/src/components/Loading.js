import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";


const MyLoader = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <ScaleLoader color="blue" height={100} width={10} radius={10} margin={10} />
        </div>
    );
}

export default MyLoader;