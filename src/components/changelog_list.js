import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './auth_form';
import RepoSelect from './repo_select';
import BranchSelect from './branch_select';
import CategorySelect from './category_select';
import ProjectSelect from './project_select';
import CreateResultButton from './create_result';
import { categorizeLog } from '../actions';

class ChangelogList extends Component {
	renderLogs() {
		let logs = this.props.logs;
		if(logs) {
			return logs.map(log => {
				const logItem = `- [#${log.number}](${log.html_url}) ${log.title}.`;
				return (
					<tr key={log.id}>
						<td>
							<a href={log.html_url} target="_blank">{logItem}</a>
						</td>
						<td>
							<CategorySelect 
								form={`CategorySelect_${log.id}`} 
								onChange={ value => this.props.categorizeLog(log, value.category) }
							/>
						</td>
					</tr>
				)
			});
		} else return (
			<tr>
				<td>
					Select a repo or project to get logs
				</td>
			</tr>
		);

	}

	checkAuth() {
		if(!this.props.auth) {
			return <AuthForm />;
		} else return (
			<div>
				<RepoSelect />
				<BranchSelect />
				<h3>
					OR
				</h3>	
				<ProjectSelect />
				<CreateResultButton />
			</div>
		);
	}

	render(){
		return(
			<div>
				<h3>List o' Logs</h3>
				{this.checkAuth()}
				<table className="table">
					<thead>
						<tr>
							<th scope="col">
								Merged PRs
							</th>
							<th scope="col">
								Category
							</th>
						</tr>
					</thead>
					<tbody>
						{this.renderLogs()}
					</tbody>
				</table>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		logs: state.logs,
		auth: state.auth
	}
}

export default connect(mapStateToProps, {categorizeLog})(ChangelogList);