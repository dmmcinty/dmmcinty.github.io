import { FETCH_BRANCHES } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_BRANCHES:
			return action.payload.data;
		default:
			return state;
	}
}