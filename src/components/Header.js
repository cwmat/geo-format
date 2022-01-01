import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import React from "react";

const Header = (props) => {
  const barHeight = props?.height || '5vh';

  return (
    <AppBar
      position="relative"
      sx={{ height: barHeight }}
    >

      <Toolbar>

        <Typography
          component={'span'}
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            height: barHeight,
            minHeight: barHeight
          }}
        >
          GeoFormat
        </Typography>

      </Toolbar>

    </AppBar>
  );
}

Header.propTypes = {
  height: PropTypes.string,
}

export default Header;