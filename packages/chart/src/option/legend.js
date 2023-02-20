import React,{ useMemo } from "react";
import useChart from "../chartContext";

export const Legend = (props) => {
  const chart = useChart();

  useMemo(() => {
    if (chart && chart.option) {
      const update = chart.option.hasOwnProperty("legend");
      chart.format(chart.option, "legend", props)

      if (props.data && chart.instance){
        chart.option.legend = {...props}
        chart.instance.setOption({legend: {data: props.data}});
        //chart.refresh();
      }
    }
  }, [chart, props.data]);

  return null;
};

//export default Legend;