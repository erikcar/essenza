import { useEffect, useMemo } from "react";

const Serie = ({ series, chart, ...rest }) => {
    
    /*useEffect(()=>{
        if(rest?.data){
            chart.setOp
        }
    }, [rest?.data])*/

    useMemo(() => {
        console.log("ECHART-DEBUG-SERIES", series, rest);
        if (series) {
            series.push(rest);
        }
    }, [series]);

    return null;
}

export default Serie;