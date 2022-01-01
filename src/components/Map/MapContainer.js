
import React, { useState, useEffect, useContext } from "react";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "../../models/Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "../Layers";
import FeatureStyles from "../../models/Features/Styles";
import { Controls, FullScreenControl } from "../Controls";
import mapConfig from "./config";
import PropTypes from 'prop-types';

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

const addMarkers = (lonLatArray) => {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const createVectorSource = (featureData) => {
  return vector({
    features: new GeoJSON().readFeatures(featureData, {
      featureProjection: get("EPSG:4326"),
    }),
  });
}

const MapContainer = (props) => {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(2);
  const [extent, setExtent] = useState(null);
  const [vectorSource, setSetVectorSource] = useState(null);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  useEffect(() => {
    if (!props?.codeData) return;
    const extent = createVectorSource(JSON.parse(props?.codeData)).getExtent();
    console.log('data updated time to zoom my dude', extent);
    setExtent(extent);
  }, [props.codeData]);

  return (

    <div>

      <Map center={fromLonLat(center)} zoom={zoom} extent={extent}>

        <Layers>

          <TileLayer source={osm()} zIndex={0} />

          {props?.codeData && (<VectorLayer
              source={createVectorSource(JSON.parse(props?.codeData))}
              style={FeatureStyles.MultiPolygon}
          />
          )}

          {/* {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}

          {showLayer2 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}

          {showMarker && <VectorLayer source={vector({ features })} />} */}
        </Layers>

        <Controls>

          <FullScreenControl />

        </Controls>

      </Map>

    </div>
  );
};

MapContainer.propTypes = {
  codeData: PropTypes.string,
};

export default MapContainer;