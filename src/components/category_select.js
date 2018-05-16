import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategorySelect extends Component {
	render() {
		return(
			<select>
				<option>Ignore</option>
				<option>Added</option>
				<option>Changed</option>
				<option>Removed</option>
				<option>Fixed</option>
			</select>
		);
	}
}

export default connect(null)(CategorySelect);