import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchIssues, selectProject } from '../actions'

class ProjectSelect extends Component {
	renderOptions() {
		let options = this.props.projects;
		if (options) {
			return options.map(projects => {
				return (
					<option 
						value={projects.name} 
						key={projects.id}
					>
						{projects.name}
					</option>
				);
			});
		}
	}

	onSubmit(value) {
		let repo = this.props.repos.find(repo => {
			return repo.selected == true;
		});
		this.props.selectProject(value.project);
		let project = this.props.projects.find(project => {
			return project.selected == true;
		});
		this.props.fetchIssues(repo.name, project.number);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<div className="form-group">
					<label>Project</label>
					<div>
						<Field
							name="project"
							component="select"
						>
							<option disabled="disabled">Select a project</option>
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
		projects: state.projects,
		repos: state.repos
	}
}

export default reduxForm({
	form: 'ProjectSelect'
})(
	connect(mapStateToProps, { fetchIssues, selectProject } )(ProjectSelect)
)