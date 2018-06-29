import { FETCH_PROJECTS, SELECT_PROJECT } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_PROJECTS:
			return action.payload.data;
		case SELECT_PROJECT:
			return action.payload;
		default:
			return state;
	}
}