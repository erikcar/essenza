import { useEffect, useRef } from "react";
import useMap from "../mapContext";

const Layer = ({oltype, source, ...rest}) => {
    const map = useMap();
	const layer = useRef();
    useEffect(() => {
		if (!map) return;

		layer.current = new oltype({...rest, source });

		map.addLayer(layer.current);
		//tileLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(layer.current);
			}
		};
	}, [map]);

	useEffect(() => {
		if(layer.current){
			layer.current.setSource(source);
		}
	}, [source]);

	return null;
};

export default Layer;