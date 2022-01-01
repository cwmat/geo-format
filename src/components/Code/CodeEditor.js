import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import PropTypes from 'prop-types';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import sample from "./sample";

import classes from './CodeEditor.module.css';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const CodeEditor = (props) => {
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <CodeMirror
        value={JSON.stringify(sample, null, 1)}
        options={{
          mode: props?.editorMode || 'javascript',
          theme: 'material',
          lineNumbers: true
        }}
        onChange={(editor, data, value) => {
          props.codeEditorDataChanged(JSON.stringify(value));
        }}
        className={classes.codeEditor}
      />
    </Box>
  );
}

CodeEditor.propTypes = {
  editorMode: PropTypes.string,
  codeEditorDataChanged: PropTypes.func,
};

export default CodeEditor;