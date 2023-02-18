import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
//import PropTypes from "prop-types";
import * as echarts from 'echarts';
import { ChartProvider } from "./chartContext";

//import * as React from "react";
const EChart = React.forwardRef((props, ref) => {
    const { children, className, source, dimensions, chart, loading, ...rest } = props;
    const [changed, refresh] = useState(false);
 
    //chart.update = update;
    //console.log("CHART-DEBUGS-RENDER", chart);

    const resizeChart = () => {
        chart.instance?.resize();
    }

    useLayoutEffect(() => {
        if (chart.instance) {
            chart.changed = true;
        }
    }, [chart.option, chart]);

    useLayoutEffect(() => {
        if (chart.instance) {
            console.log("CHART-DEBUGS", chart);
            chart.instance.setOption(chart.option);
            chart.changed = false;
        }
    }, [changed, chart])

    useLayoutEffect(() => {
        if (chart.instance) {
            /*if (chart.changed)
                chart.option.dataset = { source: source || [] };
            else
                chart.option = { dataset: { source: source || [] } };*/
                const s = Array.isArray(source)? source : [];
                chart.option.dataset = { source: s,
                    dimensions: dimensions };
            if (loading && source)
                chart.instance.hideLoading();
            
                console.log("CHART-DEBUGS-SOURCE", chart.option);
            refresh({});
        }
    }, [source]);

    useEffect(() => {

        chart.instance = echarts.init(chart.ref.current);

        const opt = chart.option;
        const s = Array.isArray(source)? source : [];
        
        opt.dataset = {
            source: s,
            dimensions: dimensions
        };

        if (loading && !source)
            chart.instance.showLoading();

        chart.instance.setOption(opt);

        chart.refresh = () => {refresh({})}

        console.log("CHART-DEBUGS-INIT", opt);
        window.addEventListener("resize", resizeChart);

        return () => {
            chart.instance?.dispose();
            window.removeEventListener("resize", resizeChart);
        };
    }, []);

    return (
        <ChartProvider chart={chart}>
            <div {...rest} ref={chart.ref} className={className? className : 'chart '} >{children}</div>
        </ChartProvider>
    )
});

const propTypes = {
    /**
     * Initial Map Zoom Value
     */
    //zoom: PropTypes.number,
}

EChart.displayName = 'Chart';
EChart.propTypes = propTypes;

export default Object.assign(EChart, {

});