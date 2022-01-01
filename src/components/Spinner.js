import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import PropTypes from 'prop-types';

const Spinner = (props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={props?.size || 100} />
    </Box>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
}

export default Spinner;