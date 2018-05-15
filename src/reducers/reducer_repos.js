import { FETCH_REPOS, SELECT_REPO } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_REPOS:
			return action.payload.data;
		case SELECT_REPO:
			return action.payload;
		default:
			return state;
	}
}