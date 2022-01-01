import Stack from "@mui/material/Stack";
import Spinner from "components/Spinner";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Loading resources...');
    navigate('/map');
  });

  return (
    <Stack className="fullHeight" alignItems="center" justifyContent="center">
      <Spinner size={400} />
    </Stack>
  );
}

export default Splash;