import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './auth_form';
import RepoSelect from './repo_select';
import BranchSelect from './branch_select';
import _ from 'lodash';

class ChangelogList extends Component {
	renderLogs() {
		return _.map(this.props.logs.data, log => {
			const logItem = `- [#${log.number}](${log.html_url}) ${log.title}.`;
			return (
				<li className="list-group-item" key={log.id}>
					<a href={log.html_url} target="_blank">{logItem}</a>
				</li>
			)
		});
	}

	checkAuth() {
		if(typeof this.props.auth == 'object') {
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
				<ul className="list-group">
					{this.renderLogs()}
				</ul>
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