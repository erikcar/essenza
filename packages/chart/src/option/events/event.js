import { useEffect, useReducer, useRef } from "react";
import useChart from "../../chartContext";

const Event = ({on, callback, ...rest}) => {
    const chart = useChart();
    const _callback = useRef()
    useEffect(() => {
		if (!chart.instance) return;
        _callback.current = evt => callback(evt, chart.instance);
        chart.instance.on(on, _callback.current)
		return () => {
			if (chart.instance) {
				chart.instance.off(on, _callback.current);
			}
		};
	}, [chart.instance, callback]);

	return null;
};

export default Event;