import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchRepos } from '../actions';

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

	render() {
		return (
			<form>
				<div className="form-group">
					<label>Repo</label>
					<div>
						<Field
							name="repo"
							component="select"
						>
							<option>Select a repo</option>
							{this.renderOptions()}
						</Field>
					</div>
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
    connect(mapStateToProps, { fetchRepos })(RepoSelect)
  );