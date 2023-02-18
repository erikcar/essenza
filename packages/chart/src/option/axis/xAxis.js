import React, { useMemo } from "react";
import useChart from "../../chartContext";

const XAxis = ({ children, ...rest }) => {
  const chart = useChart();

  const axis = useMemo(() => {
    let z = null;
    if (chart && chart.option) {
      z = [];
      chart.format(chart.option, "xAxis", z);
    }
    return z;
  }, [chart]);

  return (
    children
      ? React.Children.map(children, (child) => {
        if(!child) return null;
        console.log("ECHART-DEBUG-CHILDREN", child);
        return React.createElement(child.type, {...{...child.props, axis: axis}})
    })
      : null
  );
};

export default XAxis;