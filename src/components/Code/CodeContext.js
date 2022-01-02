import { codeActions } from "models/codeActions";
import { dataFormats } from "models/dataFormat";
import React, { createContext, useState } from "react"
import sample from "./sample";
import sampleWeb from "./sampleWeb";

export const CodeContext = createContext(null)

export const CodeContextProvider = ({ children }) => {
  const [codeData, setCodeData] = useState(JSON.stringify(sample, null, 1));
  const [mapData, setMapData] = useState(JSON.stringify(sampleWeb, null, 1));
  const [currentEpsgCode, setEpsgCode] = useState('4326');
  const [currentDataFormat, setDataFormat] = useState(dataFormats.geojson);
  const [toEpsgCode, setToEpsgCode] = useState('3857');
  const [toDataFormat, setToDataFormat] = useState(dataFormats.geojson);

  return (
    <CodeContext.Provider value={{
        codeData,
        setCodeData,
        currentEpsgCode,
        setEpsgCode,
        currentDataFormat,
        setDataFormat,
        toEpsgCode,
        setToEpsgCode,
        toDataFormat,
        setToDataFormat,
        mapData,
        setMapData,
      }}>
      {children}
    </CodeContext.Provider>
  );
};