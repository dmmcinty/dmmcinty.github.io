import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

let CategorySelect = props => {
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
	form: 'CategorySelect',
	enableReinitialize : true
})(CategorySelect);

CategorySelect = connect()(CategorySelect);

export default CategorySelect;