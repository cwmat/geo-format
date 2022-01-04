import axios from "axios";
import { geojsonToWKT } from "@terraformer/wkt";
import { wktToGeoJSON } from "@terraformer/wkt";
import { dataFormats } from "models/dataFormat";

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

  let outData = await project(coreData, payload.fromEpsg, payload.toEpsg);

  if (!outData || outData === '') return '';

  if (payload.toDataFormat !== dataFormats.geojson) {
    // TODO will need to convert to geojson from w/e supported format
    switch (payload.toDataFormat) {
      case dataFormats.wkt:
        debugger;
        outData = convertGeoJsonToWkt(coreData);
        debugger;
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
    return '';
  }
}

function convertGeoJsonToWkt(inData) {
  const parsedData = JSON.parse(inData);
  return geojsonToWKT(parsedData);
}

function convertWktToGeoJson(inData) {
  const converted = wktToGeoJSON(inData);
  return JSON.stringify(converted);
}