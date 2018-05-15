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

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

export default reduxForm({
  validate,
  form: 'AuthForm'
})(
    connect(mapStateToProps, { gitAuth })(AuthForm)
  );


// const authLink = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;


// class AuthButtons extends Component {
// 	gitLogin() {
// 		console.log('cool');
// 		let username = document.getElementById("username").value;
// 		let password = document.getElementById("password").value;
// 		this.props.gitAuth(username, password);
// 	}

// 	render() {
// 		return(
// 			<form>
// 				<div className="form-group">
// 					<input id="username" className="form-control" placeholder="Username" type="text"></input>
// 					<input id="password" className="form-control" placeholder="Password" type="password"></input>
// 				</div>
// 				<button className="btn btn-primary" onClick={this.gitLogin}>
// 					Do auth stuff
// 				</button>
// 			</form>
// 		);
// 	}
// }

// function mapStateToProps(state) {
// 	return {
// 		auth: state.auth
// 	}
// }

// export default connect(mapStateToProps, {gitAuth})(AuthButtons);