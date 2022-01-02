import axios from "axios";
import { dataFormats } from "models/dataFormat";

const ogr2ogrUrl = 'https://ogre.adc4gis.com/convert';

export async function convert(data, payload) {
  if (payload.fromDataFormat !== dataFormats.geojson) {
    // TODO will need to first convert to geojson from w/e supported format
  }

  let outData = await project(data, payload.fromEpsg, payload.toEpsg);

  if (!outData || outData === '') return '';

  if (payload.toDataFormat !== dataFormats.geojson) {
    // TODO will need to convert to geojson from w/e supported format
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