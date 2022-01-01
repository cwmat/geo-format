import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from 'react';
import TabPanel from './TabPanel';
import Toolbar from './Code/Toolbar';
import { CodeEditor } from './Code';
import { dataFormats } from 'models/dataFormat';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';

const tabData = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Tabber = (props) => {
  const [value, setValue] = React.useState(0);
  const [codeEditorMode, setCodeEditorMode] = React.useState('javascript');

  const tabChangeHandler = (event, newValue) => {
    setValue(newValue);
  };

  const epsgCodeChangeHandler = (event) => {
    console.log('code changed', event);
  }

  const dataFormatChangeHandler = (event) => {
    console.log('data format changed', event);
    switch (event) {
      case dataFormats.geojson:
        setCodeEditorMode('javascript');   
        break;
      case dataFormats.wkt:
      case dataFormats.wkb:
        setCodeEditorMode('xml');   
        break;
    
      default:
        break;
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={tabChangeHandler} aria-label="Main tabber">
          <Tab label="Code" {...tabData(0)} />
          <Tab label="Details" {...tabData(1)} />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
      >
        <Toolbar 
          epsgCodeChanged={epsgCodeChangeHandler}
          dataFormatChanged={dataFormatChangeHandler}
        />
        <CodeEditor editorMode={codeEditorMode} codeEditorDataChanged={props.codeEditorDataChanged} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Nothing here yet...
        <Paper variant="outlined" sx={{marginTop: '1rem'}}>
          <div className="imgContainer">
            <img src="/assets/images/ben.jpg" alt="Ben Kenobi" />
          </div>
        </Paper>
      </TabPanel>
    </Box>
  );
}

Tabber.propTypes = {
  codeEditorDataChanged: PropTypes.func,
};

export default Tabber;