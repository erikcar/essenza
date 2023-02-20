import React,{ useMemo } from "react";
import useChart from "../chartContext";

export const Title = (props) => {
    const chart = useChart();
	
    useMemo(() => {
		if (chart && chart.option){
            chart.format(chart.option, "title", props)
        }
	}, [chart]);

	return null;
};
