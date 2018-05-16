import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './auth_form';
import RepoSelect from './repo_select';
import BranchSelect from './branch_select';
import CategorySelect from './category_select';
import _ from 'lodash';

class ChangelogList extends Component {
	renderLogs() {
		return _.map(this.props.logs.data, log => {
			const logItem = `- [#${log.number}](${log.html_url}) ${log.title}.`;
			return (
				<tr key={log.id}>
					<td>
						<a href={log.html_url} target="_blank">{logItem}</a>
					</td>
					<td>
						<CategorySelect onChange={console.log('woop')}/>
					</td>
				</tr>
			)
		});
	}

	checkAuth() {
		if(!this.props.auth) {
			return <AuthForm />;
		} else return (
			<div>
				<RepoSelect />
				<BranchSelect />
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

export default connect(mapStateToProps, null)(ChangelogList);