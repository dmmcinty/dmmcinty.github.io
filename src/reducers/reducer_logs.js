import { FETCH_LOGS } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_LOGS:
			return action.payload;
		default:
			return state;
	}
}