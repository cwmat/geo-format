import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import React from "react";
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ErrorMessage = ({open=false, closeRequested}) => {

  const handleClose = () => {
    closeRequested();
  };

  return (
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Something Went Wrong"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Paper variant="outlined" sx={{marginTop: '1rem'}}>
            <div className="imgContainer" style={{minHeight: '412px'}}>
              <img src={`${window.location.origin}/assets/images/ya-blew-it.gif`} alt="Ben Kenobi" />
            </div>
          </Paper>
            You likely entered an invalid dataset or EPSG code.  Or something more sinister may have happened...  Not Sure.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Not Sorry</Button>
          <Button onClick={handleClose}>Sorry</Button>
        </DialogActions>
      </Dialog>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  open: PropTypes,
  closeRequested: PropTypes.func,
}

export default ErrorMessage;