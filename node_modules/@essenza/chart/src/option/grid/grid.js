import React, { useMemo } from "react";
import useChart from "../../chartContext";

export const Grid = ({ children }) => {
    const chart = useChart();
    const option = chart.option;
    const grid = useMemo(() => {
        let g = null;
        if (chart && option ) {
            g = [];
            chart.format(option, "grid", g);
        }
        return g;
    }, [chart, option]);

    return (React.Children.map(children, (child) => {
        if(!child) return null;
        return React.createElement(child.type, {...{...child.props, grid: grid }})
    })
    )
}
