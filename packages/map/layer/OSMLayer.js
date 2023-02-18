import OSM from "ol/source/OSM";
import TileLayer from "./TileLayer";

const OSMLayer = (props) => {
	return <TileLayer {...props} source={new OSM()} />;
};

export default OSMLayer;