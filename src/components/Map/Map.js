import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

const Map = ({ children, zoom, center, extent=null }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // on component mount
  useEffect(() => {
    console.log('map mount');
    let options = {
      view: new ol.View({ zoom, center, projection: 'EPSG:3857' }),
      layers: [],
      controls: [],
      overlays: []
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    console.log('map zoom');
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler TODO - enter is throwing this off somehow
  // useEffect(() => {
  //   if (!map) return;
  //   console.log('map center');
  //   map.getView().setCenter(center)
  // }, [center]);

  // extent change handler
  useEffect(() => {
    if (!map || !extent) return;
    console.log('map extent');
    map.getView()
      .fit(extent,
        {
          size: map.getSize(),
          padding: Array(4).fill(100),
        });
  }, [extent])

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
}

export default Map;