import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { categorizeLog } from '../actions';

let CategorySelect = props => {
	const {
		categoryValue
	} = props;

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

CategorySelect = reduxForm({
	form: 'CategorySelect'
})(CategorySelect);

const selector = formValueSelector('CategorySelect');

CategorySelect = connect(state => {
	const categoryValue = selector(state, 'category');
	return {
		categoryValue
	}
})(CategorySelect);

export default CategorySelect;