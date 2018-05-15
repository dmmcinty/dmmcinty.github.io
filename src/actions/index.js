export const FETCH_LOGS = 'fetch_logs';
export const GIT_AUTH = 'git_auth';
export const FETCH_REPOS = 'fetch_repos';
export const FETCH_BRANCHES = 'fetch_branches';
export const SELECT_REPO = 'select_repo';

const octokit = require('@octokit/rest')();

const gitKey = process.env.GITKEY;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export function gitAuth(credentials) {
	octokit.authenticate({
		type: 'oauth',
		token: credentials.password
	});

	const request = octokit.users.get({})
	.then(response => {
		return credentials.password;
	})
	.catch(error => {
		return null;
	});

	return {
		type: GIT_AUTH,
		payload: request
	}
}

export function fetchRepos(credentials, page) {
	octokit.authenticate({
		type: 'oauth',
		token: credentials
	});

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
		console.log(error);
	});

	return {
		type: FETCH_REPOS,
		payload: request
	}
}

export function fetchBranches(credentials, value, page) {
	octokit.authenticate({
		type: 'oauth',
		token: credentials
	});

	const request = octokit.repos.getBranches({
		owner: 'synapsestudios',
		repo: value,
		per_page: 100,
		page: page
	})
	.then(response => {
		return response;
	})
	.catch(error => {
		console.log(error);
	});

	return {
		type: FETCH_BRANCHES,
		payload: request
	}
}

export function fetchLogs(credentials, repo, branch, page) {
	octokit.authenticate({
		type: 'oauth',
		token: credentials
	});

	const request = octokit.pullRequests.getAll(
	{
		owner: 'synapsestudios',
		repo: repo,
		state: 'closed',
		base: branch,
		per_page: 100,
		page: page,
		direction: 'asc'
	})
	.then(response => {
		return response;
	})
	.catch(error => {
		console.log(error);
	});

	return {
		type: FETCH_LOGS,
		payload: request
	}
}

export function selectRepo(repo) {
	return {
		type: SELECT_REPO,
		payload: repo
	}
}

// export function fetchLogs() {
// 	const request = octokit.pullRequests.getAll(
// 	{
// 		owner: 'synapsestudios',
// 		repo: 'silver-sneakers',
// 		state: 'closed',
// 		base: 'release/v0.2.0',
// 		per_page: 100,
// 		direction: 'asc'
// 	})
// 	.then(response => {
// 		return response;
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

// 	return {
// 		type: FETCH_LOGS,
// 		payload: request
// 	}
// }

// export function fetchLogs(page) {
// 	const request = axios.get('https://api.github.com/repos/synapsestudios/silver-sneakers/pulls', {
// 		params: {
// 			access_token: gitKey,
// 			state: 'closed',
// 			base: 'release/v0.2.0',
// 			page: page,
// 			per_page: 100,
// 			sort: 'asc'
// 		}
// 	})
// 	.then(function(response) {
// 		return response;
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	});

// 	return {
// 		type: FETCH_LOGS,
// 		payload: request
// 	}
// }

// export function gitAuth() {
// 	const request = axios.get('https://github.com/login/oauth/authorize', {
// 		headers: {
// 			accept: 'application/vnd.github.machine-man-preview+json'
// 		},
// 		params: {
// 			client_id: clientID
// 		}
// 	})
// 	.then(function(response) {
// 		console.log(response);
// 		return response;
// 	})
// 	.catch(function(error) {
// 		console.log(error);
// 	});

// 	return {
// 		type: GIT_AUTH,
// 		payload: request
// 	}
// }