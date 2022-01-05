import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider  } from "@mui/material/styles";
import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Header from "components/Header";
import { MapContainer } from "components/Map";
import { CodeContainer } from "components/Code";
import { convert, isValidGeoJsonGeom } from "lib/conversion";
import { CodeContext } from "components/Code/CodeContext";
import { dataFormats } from "models/dataFormat";
import ErrorMessage from "components/ErrorMessage";

const MapMain = () => {
  const {
    codeData,
    setCodeData,
    setMapData,
    currentEpsgCode,
    currentDataFormat,
    setEpsgCode,
    setDataFormat,
  } = useContext(CodeContext);

  const [showError, setShowError] = React.useState(false);

  const theme = createTheme(
    {
      palette: {
      mode: 'dark',
    },
  }
  );

  const codeEditorDataChangedHandler = async (event) => {
    console.log('data changed');
    setCodeData(event);
    // TODO if data are valid update map data
    let newData;
    try {
      newData = await convert(event, {
        fromEpsg: currentEpsgCode,
        fromDataFormat: currentDataFormat,
        toEpsg: 3857, // Map data should always be in web mercator
        toDataFormat: dataFormats.geojson, // Map data should always be in geojson
      });
    } catch (error) {
      console.log('ERROR');
      openHandler();
    }
    // const newData = await convert(event, {
    //   fromEpsg: currentEpsgCode,
    //   fromDataFormat: currentDataFormat,
    //   toEpsg: 3857, // Map data should always be in web mercator
    //   toDataFormat: dataFormats.geojson, // Map data should always be in geojson
    // });
    if (isValidGeoJsonGeom(newData)) setMapData(newData);
  }

  const conversionRequestHandler = async (event, payload) => {
    console.log('conversion requested', event);
    console.log(payload);
    let newData;
    try {
      newData = await convert(codeData, payload);
    } catch (error) {
      console.log('ERROR');
      openHandler();
    }
    // const newData = await convert(codeData, payload);
    setEpsgCode(payload.toEpsg);
    setDataFormat(payload.toDataFormat);
    setCodeData(newData);
  }

  const openHandler = () => {
    setShowError(true);
  }

  const closeHandler = () => {
    setShowError(false);
  }
  
  return (
    <ThemeProvider theme={theme}>

      <Header />

      <Grid container component="main" sx={{ height: '95vh' }}>
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          }}
        >
          {/* Main Map */}
          <MapContainer />

        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {/* Main Code */}
          <CodeContainer 
            codeEditorDataChanged={codeEditorDataChangedHandler}
            conversionRequest={(e, payload) => {conversionRequestHandler(e, payload)}}
          />
        </Grid>

      </Grid>

      <ErrorMessage open={showError} closeRequested={closeHandler} />

    </ThemeProvider>
  );
}

export default MapMain;