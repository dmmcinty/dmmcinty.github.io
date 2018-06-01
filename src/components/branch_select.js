import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchLogs } from '../actions';

class BranchSelect extends Component {
	renderOptions() {
		let branches = this.props.branches;
		if(branches) {
			return this.props.branches.map(branch => {
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
	}

	onSubmit(value) {
		let repo = this.props.repos.find(repo => {
			return repo.selected == true;
		});
		this.props.fetchLogs(repo.name, value.branch);
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
		branches: state.branches
	}
}

export default reduxForm({
  validate,
  form: 'BranchSelect'
})(
    connect(mapStateToProps, { fetchLogs })(BranchSelect)
  );