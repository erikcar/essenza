import React,{ useMemo } from "react";

export const Zoom = ({ zoom, ...rest }) => {
    useMemo(() => {
        if (zoom) {
            zoom.push(rest);
        }
    }, [zoom]);

    return null;
}

export default Zoom;