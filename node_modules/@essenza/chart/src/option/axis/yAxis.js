import React, { useMemo } from "react";
import useChart from "../../chartContext";

export const YAxis = ({ direction, children, ...rest }) => {
  const chart = useChart();

  const yaxis = useMemo(() => {
    let z = null;
    if (chart && chart.option) {
      z = [];
      chart.format(chart.option, "yAxis", z);
    }
    return z;
  }, [chart]);

  return (
    children
      ? React.Children.map(children, (child) => {
        if(!child) return null;
        console.log("ECHART-DEBUG-CHILDREN", child);
        return React.createElement(child.type, {...{...child.props, axis: yaxis}})
    })
      : null
  );
};