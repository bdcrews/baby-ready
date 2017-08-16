import React from 'react';
import {FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    };

    render() {
        let validationState;

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = <HelpBlock className="form-warning">{this.props.meta.warning}</HelpBlock>;
            validationState = 'warning';
        }

        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <HelpBlock className="form-error">{this.props.meta.error}</HelpBlock>;
            validationState = 'error';
        }

        return (
            <FormGroup validationState={validationState}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    inputRef={input => (this.input = input)}
                />
                <FormControl.Feedback />
                {error}
                {warning}
            </FormGroup>
        );
    }
}
