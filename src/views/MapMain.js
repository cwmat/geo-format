import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider  } from "@mui/material/styles";
import React from "react";
import Paper from "@mui/material/Paper";
import Header from "components/Header";
import { MapContainer } from "components/Map";
import { CodeContainer } from "components/Code";

const MapMain = () => {
  const [codeData, setCodeData] = React.useState('');

  const theme = createTheme(
    {
      palette: {
      mode: 'dark',
    },
  }
  );

  const codeEditorDataChangedHandler = (event) => {
    console.log('data changed');
    setCodeData(event);
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
          <MapContainer codeData={codeData} />

        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {/* Main Code */}
          <CodeContainer codeEditorDataChanged={codeEditorDataChangedHandler} />
        </Grid>

      </Grid>

    </ThemeProvider>
  );
}

export default MapMain;