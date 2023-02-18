import { useEffect, useRef } from "react";
import useMap from "../mapContext";

const Control = ({olcontrol, refs, ...rest}) => {
    const map = useMap();
	const control = useRef();
    useEffect(() => {
		if (!map) return;
		console.log("CONTROL-DEBUG-INIT", map);
		control.current = new olcontrol({...rest, map: map});

		map.controls.push(control.current);
		
		if(refs){
			console.log("CONTROL-DEBUG-INIT");
			refs.current = control.current;
		}
			

		return () => map.controls.remove(control.current);
	}, [map]);

	/*useEffect(() => {
		if(Control.current){
			Control.current.setSource(source);
		}
	}, [source]);*/

	return null;
};

export default Control;