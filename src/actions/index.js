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
		console.log(error);
	});

	return {
		type: FETCH_REPOS,
		payload: request
	}
}

export function fetchBranches(value, page) {
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

export function fetchLogs(repo, branch, page) {
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