import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gitAuth } from '../actions';
import { Field, reduxForm } from 'redux-form';

class AuthForm extends Component {
	renderField(field) {
		const { meta: { touched, error} } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input 
					className="form-control"
					type={field.type ? field.type : 'text'}
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		)
	} 

	onSubmit(values) {
		this.props.gitAuth(values);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Password"
					name="password"
					type="password"
					component={this.renderField}
				/>
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
		)
	}
}

function validate(values) {
	const errors = {};

	if(!values.password || values.password.trim() === '') {
		errors.password = "Password is required"
	}

	return errors;
}

export default reduxForm({
  validate,
  form: 'AuthForm'
})(
    connect(null, { gitAuth })(AuthForm)
  );