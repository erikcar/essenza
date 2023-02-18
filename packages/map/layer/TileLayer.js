import OLTileLayer from "ol/layer/Tile";
import Layer from "./Layer";

const TileLayer = (props) => {
	return <Layer oltype={OLTileLayer} {...props} />;
};

export default TileLayer;