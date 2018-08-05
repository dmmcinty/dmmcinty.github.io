import { FETCH_ISSUES, CATEGORIZE_LOG } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_ISSUES:
			return action.payload;
		case CATEGORIZE_LOG:
			state.map(log => {
				if(log.id == action.payload.id) {
					log = action.payload;
				} 
			});
			return state;
		default:
			return state;
	}
}