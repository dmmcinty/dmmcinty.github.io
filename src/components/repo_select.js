import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchRepos, fetchBranches, selectRepo } from '../actions';
import _ from 'lodash';

class RepoSelect extends Component {
	componentDidMount() {
		this.props.fetchRepos();
	}

	renderOptions() {
		if (typeof this.props.repos != 'string') {
			const options = this.props.repos;
			return _.map(options, repo => {
				return (
					<option 
						value={repo.name} 
						key={repo.id}
					>
						{repo.name}
					</option>
				);
			});
		}
	}

	onSubmit(value) {
		this.props.selectRepo(value.repo);
		this.props.fetchBranches(value.repo);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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