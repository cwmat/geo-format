import React from "react";
import PropTypes from 'prop-types';
import Tabber from "components/Tabber";

const CodeContainer = (props) => {
  return (
    <React.Fragment>
      <Tabber
        codeEditorDataChanged={props.codeEditorDataChanged}
        conversionRequest={(e, payload) => {props.conversionRequest(e, payload)}}
      />
    </React.Fragment>
  );
}

export default CodeContainer;