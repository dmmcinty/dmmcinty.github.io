import { GIT_AUTH } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case GIT_AUTH:
			return action.payload;
		default:
			return state;
	}
}