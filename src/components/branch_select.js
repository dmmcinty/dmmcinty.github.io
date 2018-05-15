import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchLogs } from '../actions';
import _ from 'lodash';

class BranchSelect extends Component {
	renderOptions() {
		return _.map(this.props.branches, branch => {
			return (
				<option 
					value={branch.name} 
					key={branch.name}
				>
					{branch.name}
				</option>
			);
		});
	}

	onSubmit(value) {
		this.props.fetchLogs(this.props.auth, this.props.repos, value.branch);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<div className="form-group">
					<label>Branch</label>
					<div>
						<Field
							name="branch"
							component="select"
						>
							<option disabled="disabled">Select a branch</option>
							{this.renderOptions()}
						</Field>
					</div>
				</div>
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
		)
	}
}

function validate(values) {
	const errors = {};

	return errors;
}

function mapStateToProps(state) {
	return {
		repos: state.repos,
		selectedRepo: state.selectedRepo,
		branches: state.branches,
		auth: state.auth
	}
}

export default reduxForm({
  validate,
  form: 'BranchSelect'
})(
    connect(mapStateToProps, { fetchLogs })(BranchSelect)
  );