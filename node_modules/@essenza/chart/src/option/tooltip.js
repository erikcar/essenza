import {useMemo } from "react";
import useChart from "../chartContext";

const Tooltip = (props) => {
    const chart = useChart();
	
    useMemo(() => {
		if (chart && chart.option){
            chart.format(chart.option, "tooltip", props)
        }
	}, [chart]);

	return null;
};

export default Tooltip;