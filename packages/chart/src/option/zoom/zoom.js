import { useMemo } from "react";

const Zoom = ({ zoom, ...rest }) => {
    useMemo(() => {
        if (zoom) {
            zoom.push(rest);
        }
    }, [zoom]);

    return null;
}

export default Zoom;