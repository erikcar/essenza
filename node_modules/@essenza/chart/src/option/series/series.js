import React, { useMemo } from "react";
import useChart from "../../chartContext";

export const Series = ({ children }) => {
    const chart = useChart();
    const option = chart.option;
    const series = useMemo(() => {
        let s = null;
        if (chart && option ) {
            s=[];
            chart.format(option, "series", s);
        }
        return s;
    }, [chart, option]);

    return (React.Children.map(children, (child) => {
        if(!child) return null;
        return React.createElement(child.type, {...{...child.props, series: series, chart: chart}})
    })
    )
}