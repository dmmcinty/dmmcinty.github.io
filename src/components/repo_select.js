import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchRepos, fetchBranches, selectRepo } from '../actions';

class RepoSelect extends Component {
	componentDidMount() {
		this.props.fetchRepos();
	}

	renderOptions() {
		let options = this.props.repos;
		if (options) {
			return options.map(repo => {
				return (
					<option 
						value={repo.name} 
						key={repo.id}
					>
						{repo.name}
					</option>
				);
			});
		} else return (
			<option value = {options}>
				{options}
			</option>
		)
	}

	onSubmit(value) {
		this.props.selectRepo(value.repo);
		this.props.fetchBranches(value.repo);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
				<div className="form-group">
					<label>Repo</label>
					<div>
						<Field
							name="repo"
							component="select"
						>
							<option disabled="disabled">Select a repo</option>
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

function mapStateToProps(state) {
	return {
		repos: state.repos
	}
}

export default reduxForm({
  form: 'RepoSelect'
})(
    connect(mapStateToProps, { fetchRepos, fetchBranches, selectRepo })(RepoSelect)
  );