import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

class CategorySelect extends Component {
	render() {
		return(
			<Field
				name="category"
				component="select"
			>
				<option>Ignore</option>
				<option>Added</option>
				<option>Changed</option>
				<option>Removed</option>
				<option>Fixed</option>
			</Field>
		);
	}
}

export default reduxForm()(CategorySelect);