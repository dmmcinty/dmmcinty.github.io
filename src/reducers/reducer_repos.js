import { FETCH_REPOS, SELECT_REPO } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_REPOS:
			return action.payload.data;
		case SELECT_REPO:
			state.forEach(repo => {
				if(repo.name == action.payload) {
					repo.selected = true;
				} else {
					repo.selected = false;
				}
			});
			return state;
		default:
			return state;
	}
}