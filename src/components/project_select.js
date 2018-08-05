import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

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

	render() {

		return (
			<form>
				<div className="form-group">
					<label>Project</label>
					<div>
						<Field
							name="project"
							component="select"
						>
							<option>Select a project</option>
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
		projects: state.projects,
	}
}

export default reduxForm({
	form: 'ProjectSelect'
})(
	connect(mapStateToProps)(ProjectSelect)
)