import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as ol from "ol";
import {MapProvider} from "./mapContext"
import Layers from "./layer/Layers";
import Controls from "./control/Controls";
import Events from "./event/events";

//import * as React from "react";
const Map = React.forwardRef((props, ref) => {
  const {zoom = 2, center = [0,0], children, className, style, ...rest} = props;

  const [olmap, setMap] = useState();

	useEffect(() => {
    const map = new ol.Map({
      layers:[],
      controls:[],
      overlays:[],
      target: ref.current,
      view: new ol.View({
        center: center,
        zoom: zoom,
      }),
    })

		setMap(map);

		return () => map.setTarget(undefined);
	}, []);

  /*useEffect(() => {
		if (!olmap) return;

		olmap.getView().setCenter(center)
	}, [center]);*/

	useEffect(() => {
		if (!olmap) return;

		olmap.getView().setZoom(zoom);
	}, [zoom]);

  useEffect(() => {
		if (!olmap) return;

		olmap.getView().setCenter(center);
	}, [center]);

  return(
    <MapProvider map={olmap}>
      <div id="map" {...rest} ref={ref} className={className} style={style}>{children}</div>
    </MapProvider>
  )
});

const propTypes = {
  /**
   * Initial Map Zoom Value
   */
  zoom: PropTypes.number,
}

Map.displayName = 'Map';
Map.propTypes = propTypes;

export default Object.assign( Map, {
  Layers: Layers,
  Controls: Controls,
  Events: Events
});