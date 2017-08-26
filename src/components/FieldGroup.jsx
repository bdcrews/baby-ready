import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {Field} from 'redux-form';
import Input from './input';

export default function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel><br />
      <FormControl componentClass={Field} component="input" {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}