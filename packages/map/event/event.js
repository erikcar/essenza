import { useEffect } from "react";
import useMap from "../mapContext";

const Event = ({on, callback, ...rest}) => {
    const map = useMap();

    useEffect(() => {
		if (!map) return;
        const _callback = evt => callback(evt, map);
        map.on(on, _callback)
		return () => {
			if (map) {
				map.un(on, _callback);
			}
		};
	}, [map]);

	return null;
};

export default Event;