import React, {useMemo } from "react";
import useChart from "../chartContext";

export const Tooltip = (props) => {
    const chart = useChart();
	
    useMemo(() => {
		if (chart && chart.option){
            chart.format(chart.option, "tooltip", props)
        }
	}, [chart]);

	return null;
};
