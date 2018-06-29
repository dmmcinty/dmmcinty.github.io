import { FETCH_ISSUES } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_ISSUES:
			return action.payload.data;
		default:
			return state;
	}
}