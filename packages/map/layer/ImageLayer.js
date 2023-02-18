import Layer from "./Layer";
import ImageLayer2 from 'ol/layer/Image';

const ImageLayer = (props) => {
	return <Layer oltype={ImageLayer2} {...props} />;
};

export default ImageLayer;