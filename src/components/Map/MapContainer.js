
import React, { useState, useEffect, useContext } from "react";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "../../models/Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "../Layers";
import styleFunction from "../../models/Features/Styles";
import { Controls, FullScreenControl } from "../Controls";
import mapConfig from "./config";
import PropTypes from 'prop-types';
import { CodeContext } from "components/Code/CodeContext";
import _ from "lodash";
import * as ol from "ol";

const createVectorSource = (featureData) => {
  return vector({
    features: new GeoJSON().readFeatures(featureData, {
      featureProjection: get("EPSG:3857"),
    }),
  });
}

const MapContainer = (props) => {
  const {mapData} = useContext(CodeContext);
  const [center] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(2);
  const [extent, setExtent] = useState(null);

  const [showLayer, setShowLayer] = useState(true);

  const debounceShowLayer = _.debounce(data => {
    setShowLayer(true);
  }, 500);

  const refreshLayer = () => {
    setShowLayer(false);
    debounceShowLayer();
  }

  useEffect(() => {
    if (!mapData) return;
    const extent = createVectorSource(mapData).getExtent() ;
    refreshLayer();
    setExtent(extent);
  }, [mapData]);

  return (

    <div>

      <Map center={fromLonLat(center)} zoom={zoom} extent={extent}>

        <Layers>

          <TileLayer source={osm()} zIndex={0} />

          {mapData && showLayer && (<VectorLayer
              source={createVectorSource(mapData)}
              style={styleFunction}
          />
          )}

        </Layers>

        <Controls>

          <FullScreenControl />

        </Controls>

      </Map>

    </div>
  );
};

MapContainer.propTypes = {
};

export default MapContainer;