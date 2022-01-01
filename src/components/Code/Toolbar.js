import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { dataFormats } from 'models/dataFormat';
import Button from '@mui/material/Button';

import classes from './Toolbar.module.css';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

const Toolbar = (props) => {
  const dataFormatOptions = [
    {
      value: dataFormats.geojson,
      label: 'GeoJSON',
      disabled: false
    },
    {
      value: dataFormats.wkt,
      label: 'WKT',
      disabled: false
    },
    {
      value: dataFormats.wkb,
      label: 'WKB',
      disabled: true
    },
    {
      value: dataFormats.esrijson,
      label: 'Esri JSON',
      disabled: true
    },
  ];
  const [currentEpsgCode, setEpsgCode] = useState('4326');
  const [currentDataFormat, setDataFormat] = useState(dataFormats.geojson);
  const [toEpsgCode, setToEpsgCode] = useState('3857');
  const [toDataFormat, setToDataFormat] = useState(dataFormats.geojson);

  useEffect(() => {
    console.log(currentEpsgCode, currentDataFormat);
  }, [currentEpsgCode, currentDataFormat]);

  const epsgChangeHandler = (event) => {
    setEpsgCode(event.target.value);
    // TODO add validation to useEffect to make sure valid/supported epsg
    props.epsgCodeChanged(event.target.value);
  };

  const dataFormatChangeHandler = (event) => {
    setDataFormat(event.target.value);
    props.dataFormatChanged(event.target.value);
  };

  const toEpsgChangeHandler = (event) => {
    setEpsgCode(event.target.value);
    // TODO add validation to useEffect to make sure valid/supported epsg
    props.epsgCodeChanged(event.target.value);
  };

  const toDataFormatChangeHandler = (event) => {
    setDataFormat(event.target.value);
    props.dataFormatChanged(event.target.value);
  };

  return (
    <Stack direction="row" spacing={2}>
        <Typography
            component={'span'}
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              paddingTop: '1rem',
            }}
          >
            From
        </Typography>
        {/* EPSG Code */}
        <TextField className={classes.epsgCode} id="epsg" label="EPSG Code" variant="outlined" value={currentEpsgCode} onChange={epsgChangeHandler} />

        {/* Data format */}
        {/* <InputLabel id="dataFormatLabel">Data Format</InputLabel> */}
        <Select
          labelId="dataFormatLabel"
          id="dataFormat"
          value={currentDataFormat}
          label="Data Format"
          onChange={dataFormatChangeHandler}
        >
          {dataFormatOptions.map(({ value, label, disabled }, index) => <MenuItem disabled={disabled} value={value} key={`optionKey${index}`}>{label}</MenuItem>)}
        </Select>


        <Typography
            component={'span'}
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              marginLeft: '2rem',
              paddingTop: '1rem',
            }}
          >
            To
        </Typography>
        {/* TO EPSG Code */}
        <TextField className={classes.epsgCode} id="toEpsg" label="EPSG Code" variant="outlined" value={toEpsgCode} onChange={toEpsgChangeHandler} />

        {/* TO Data format */}
        {/* <InputLabel id="toDataFormatLabel">Data Format</InputLabel> */}
        <Select
          labelId="toDataFormatLabel"
          id="toDataFormat"
          value={toDataFormat}
          label="Data Format"
          onChange={toDataFormatChangeHandler}
        >
          {dataFormatOptions.map(({ value, label, disabled }, index) => <MenuItem disabled={disabled} value={value} key={`optionKey${index}`}>{label}</MenuItem>)}
        </Select>

        {/* Conversion button */}
        <Button
          variant="contained"
          onClick={(e) => props.conversionRequest(e, {
            fromEpsg: currentEpsgCode,
            fromDataFormat: currentDataFormat,
            toEpsg: toEpsgCode,
            toDataFormat: toDataFormat,
          })}
        >Convert</Button>
    </Stack>
  );
}

Toolbar.propTypes = {
  epsgCodeChanged: PropTypes.func,
  dataFormatChanged: PropTypes.func,
  conversionRequest: PropTypes.func,
};

export default Toolbar;