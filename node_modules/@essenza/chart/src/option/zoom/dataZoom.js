import React, { useMemo } from "react";
import useChart from "../../chartContext";

export const DataZoom = ({ children }) => {
    const chart = useChart();
    const option = chart.option;
    const zoom = useMemo(() => {
        let z = null;
        if (chart && option ) {
            z=[];
            chart.format(option, "dataZoom", z);
        }
        return z;
    }, [chart, option]);

    return (React.Children.map(children, (child) => {
        if(!child) return null;
        return React.createElement(child.type, {...{...child.props, zoom: zoom}})
    })
    )
}