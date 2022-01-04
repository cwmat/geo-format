import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

const defaultStyle = {
  'Point': new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      }),
      radius: 5,
      stroke: new Stroke({
        color: 'blue',
        width: 1
      })
    })
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 4
    })
  }),
  'Polygon': new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    }),
    stroke: new Stroke({
      color: 'blue',
      width: 1
    })
  }),
  'MultiPoint': new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      }),
      radius: 5,
      stroke: new Stroke({
        color: 'blue',
        width: 1
      })
    })
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 4
    })
  }),
  'MultiPolygon': new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    }),
    stroke: new Stroke({
      color: 'blue',
      width: 1
    })
  })
};

const styleFunction = (feature, resolution) => {
  const featureStyleFunction = feature.getStyleFunction();
  if (featureStyleFunction) {
    return featureStyleFunction.call(feature, resolution);
  } else {
    return defaultStyle[feature.getGeometry().getType()];
  }
}

export default styleFunction;