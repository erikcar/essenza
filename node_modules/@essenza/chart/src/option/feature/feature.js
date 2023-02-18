import { useMemo } from "react";

const Feature = ({ feature, name, ...rest }) => {

    useMemo(() => {
        console.log("ECHART-DEBUG-SERIES", feature, rest);
        if (feature) {
            feature[name] = rest;
        }
    }, [feature]);

    return null;
}

export default Feature;