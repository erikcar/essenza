import { useMemo } from "react";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import TileLayer from "./TileLayer";

const ContourLayer = ({title, type, ...rest}) => {
    const source = useMemo(() => new XYZ({
        attributions: [
            '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> - <a target="_blank" href="https://www.cyclosm.org/">CyclOSM</a>',
            OSM.ATTRIBUTION
        ],
        url: 'https://{a-c}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'
    }), [])
    return <TileLayer {...rest} title={title || "Contour Lines"} type={type || "base"} source={source} />;
};

export default ContourLayer;