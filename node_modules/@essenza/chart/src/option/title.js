import { useMemo } from "react";
import useChart from "../chartContext";

const Title = (props) => {
    const chart = useChart();
	
    useMemo(() => {
		if (chart && chart.option){
            chart.format(chart.option, "title", props)
        }
	}, [chart]);

	return null;
};

export default Title;