import { useRef, useState } from "react";

export function useEChart(option){
    const chart = useRef({format: (opt, field, props) => {
        if (opt.hasOwnProperty(field)) {
            const target = opt[field];
            for (const key in props) {
                if (!Object.hasOwnProperty.call(target, key)) {
                    target[key] = props[key];
                }
            }
        }
        else
            opt[field] = props;
    }}).current;
    const [opt, setOption] = useState(option || {});
    chart.option = opt;
    chart.setOption = setOption;
    chart.ref = useRef();
    return chart;
}