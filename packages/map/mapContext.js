import React from 'react';
import * as ol from "ol";

const MapContext = React.createContext(null);

export const MapProvider = ({ map, children}) => {
    console.log("MAP PROVIDER");
    /*const value : MapContextType = {
        map: map {map: map}
    }*/
    return(
        <MapContext.Provider value={map} >
            {children}
        </MapContext.Provider>
    )
}
const useMap = () => React.useContext(MapContext);

export default useMap;