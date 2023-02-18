import OLVectorLayer from "ol/layer/Vector";
import Layer from "./Layer";

const VectorLayer = (props) => {
	return  <Layer oltype={OLVectorLayer} {...props} />;
};

export default VectorLayer;