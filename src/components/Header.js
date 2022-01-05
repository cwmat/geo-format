import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const Header = (props) => {
  const barHeight = props?.height || '5vh';

  const handleGithubClick = () => {
    window.open('https://github.com/cwmat/geo-format');
  }

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

        <Typography
          component={'span'}
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            height: barHeight,
            minHeight: barHeight,
            position: 'absolute',
            right: '2rem',
            top: '0.25rem',
          }}
        >
        <Tooltip title="Github Link">
          <IconButton onClick={handleGithubClick}>
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        </Typography>

      </Toolbar>

    </AppBar>
  );
}

Header.propTypes = {
  height: PropTypes.string,
}

export default Header;