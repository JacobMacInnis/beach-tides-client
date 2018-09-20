import React from 'react';
import './search-form-input.css';
import { reduxForm } from 'redux-form';

 export class Input extends React.Component  {

  render() {
    const Element = this.props.element || 'input';
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
        error = <div className="form-error">{this.props.meta.error}</div>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
        warning = (
            <div className="form-warning">{this.props.meta.warning}</div>
        );
    }
    return (
      <div className={`search-form-${this.props.input.name}`}>
        <label className={`search-form-${this.props.input.name}-label`} htmlFor={this.props.input.name}>
          {this.props.label}
          {error}
          {warning}
        </label>
        <Element 
          {...this.props.input}
          className={`form-${this.props.input.name}`}
          id={this.props.input.name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          ref={input => (this.input = input)}
        />
      </div>
    )
  }
}

export default reduxForm({ form: 'search' })(Input);