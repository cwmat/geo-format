import axios from "axios";
import { dataFormats } from "models/dataFormat";
import GeoJSON  from "ol/format/GeoJSON";
import WKT from "ol/format/WKT";

const ogr2ogrUrl = 'https://ogre.adc4gis.com/convert';

export async function convert(data, payload) {
  let coreData = data;
  if (payload.fromDataFormat !== dataFormats.geojson) {
    // TODO will need to first convert to geojson from w/e supported format
    switch (payload.fromDataFormat) {
      case dataFormats.wkt:
        coreData = convertWktToGeoJson(data);
        break;
    
      default:
        break;
    }
  }

  let outData;
  try {
    outData = await project(coreData, payload.fromEpsg, payload.toEpsg);
  } catch (error) {
    console.error(error.message);
    throw error.message;
  }
  // let outData = await project(coreData, payload.fromEpsg, payload.toEpsg);

  if (!outData || outData === '') return '';

  if (payload.toDataFormat !== dataFormats.geojson) {
    // TODO will need to convert to geojson from w/e supported format
    switch (payload.toDataFormat) {
      case dataFormats.wkt:
        outData = convertGeoJsonToWkt(outData);
        break;
    
      default:
        break;
    }
  }

  return outData;
}

export function isValidGeoJsonGeom(data) {
  // Empty string should remove shape
  if (data === '') return true;

  // TODO May be worth pulling in https://www.npmjs.com/package/geojson-validation
  try {
    const parsed = JSON.parse(data);
    if (parsed?.features?.[0]?.geometry !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function project(data, fromEpsg, toEpsg) {
  const blob = new Blob([data], { type: 'text/json' });
  const f = new File([blob], "sample.json", {type: "text/json", lastModified: Date.now()});

  const formData = new FormData();
  formData.append('sourceSrs', `EPSG:${fromEpsg}`);
  formData.append('targetSrs', `EPSG:${toEpsg}`);
  formData.append('upload', f);

  try {
    const resp = await axios.post(ogr2ogrUrl, formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
    });
    return JSON.stringify(resp.data, null, 1);
  } catch (error) {
    console.error(error);
    throw error.message;
    // return '';
  }
}

function convertGeoJsonToWkt(inData) {
  var wktOptions = {};
  var geojsonFormat = new GeoJSON();
  var outFeature = geojsonFormat.readFeatures(inData);
  var wkt = new WKT(wktOptions);
  var out = wkt.writeFeatures(outFeature);
  return out;
}

function convertWktToGeoJson(inData) {
  var geojsonOptions = {};
  var wktFormat = new WKT();
  var outFeature = wktFormat.readFeatures(inData);
  var geojson = new GeoJSON(geojsonOptions);
  var out = geojson.writeFeatures(outFeature);
  return out;
}