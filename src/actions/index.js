export const FETCH_LOGS = 'fetch_logs';
export const CATEGORIZE_LOG = 'categorize_log';
export const GIT_AUTH = 'git_auth';
export const FETCH_REPOS = 'fetch_repos';
export const SELECT_REPO = 'select_repo';
export const CREATE_RESULT = 'create_result';
export const FETCH_PROJECTS = 'fetch_projects';
export const SELECT_PROJECT = 'select_project';
export const FETCH_ISSUES = 'fetch_issues';

const octokit = require('../@octokit/rest')();

async function paginate (method, params) {
	let response = await method(params);
	let {data} = response;
	let {items} = data;
	while (octokit.hasNextPage(response)) {
		if(items) {
			response = await octokit.getNextPage(response, params.headers);
			items = items.concat(response.data.items);
		} else {
			response = await octokit.getNextPage(response, params.headers);
			data = data.concat(response.data);			
		}
	}
	return items ? items : data;
}

export function gitAuth(credentials) {
	octokit.authenticate({
		type: 'oauth',
		token: credentials.password
	});

	const request = octokit.users.get({})
	.then(response => {
		return true;
	})
	.catch(error => {
		return false;
	});

	return {
		type: GIT_AUTH,
		payload: request
	}
}

export function fetchRepos(page) {
	const request = octokit.repos.getAll({
		visibility: 'private',
		affiliation: 'organization_member',
		sort: 'updated',
		per_page: 100,
		page: page
	})
	.then(response => {
		return response;
	})
	.catch(error => {
		console.error(error);
	});

	return {
		type: FETCH_REPOS,
		payload: request
	}
}

export function selectRepo(repo) {
	return {
		type: SELECT_REPO,
		payload: repo
	}
}

export function fetchProjects(repo) {
	const params = {
		owner: 'synapsestudios',
		repo,
		state: 'all',
		per_page: 100,
		headers: {
			accept: 'application/vnd.github.inertia-preview+json'
		}
	};
	const request = paginate(octokit.projects.getRepoProjects, params)
	.then(response => {
		return response;
	})
	.catch(error => {
		console.error(error);
	});
	return {
		type: FETCH_PROJECTS,
		payload: request
	}
}

export function selectProject(project) {
	return {
		type: SELECT_PROJECT,
		payload: project
	}
}

export function fetchIssues(repo, project_num) {
	const q = `type:issue+state:closed+project:synapsestudios/${repo}/${project_num}`;
	const params = {
		q,
		sort: "created",
		order: "asc",
		per_page: 100
	};
	const request = paginate(octokit.search.issues, params)
	.then(response => {
		return response;
	})
	.catch(error => {
		console.error(error);
	});
	return {
		type: FETCH_ISSUES,
		payload: request
	}
}

export function categorizeLog(log, category) {
	log.category = category;

	return {
		type: CATEGORIZE_LOG,
		payload: log
	}
}

export function createResult(logs) {
	return {
		type: 	CREATE_RESULT,
		payload: logs
	}
}