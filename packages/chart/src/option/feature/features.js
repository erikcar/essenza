import React, { useMemo } from "react";
import useChart from "../../chartContext";

const Features = ({ children }) => {
    const chart = useChart();
    const option = chart.option;
    const feature = useMemo(() => {
        let f = null;
        if (chart && option) {
            f ={};
            chart.format(option, "toolbox", {feature: f})
        }
        return f;
    }, [chart, option]);

    return (React.Children.map(children, (child) => {
        if(!child) return null;
        return React.createElement(child.type, {...{...child.props, feature: feature}})
    })
    )
}

export default Features;