import Box from "@mui/material/Box";
import React, { useContext } from "react";
import PropTypes from 'prop-types';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import { CodeContext } from "components/Code/CodeContext";
import _ from "lodash";

import classes from './CodeEditor.module.css';

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const CodeEditor = (props) => {
  const {codeData} = useContext(CodeContext);

  const codeEditorDataChangedHandler = _.debounce(data => {
    props.codeEditorDataChanged(data);
  }, 500);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <CodeMirror
        value={codeData}
        options={{
          mode: props?.editorMode || 'javascript',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
        }}
        onChange={(editor, data, value) => {
          // TODO check if geojson or WKT
          codeEditorDataChangedHandler(value);
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