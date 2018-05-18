import { FETCH_LOGS, CATEGORIZE_LOG } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_LOGS:
			return action.payload;
		case CATEGORIZE_LOG:
			_.map(state.data, log => {
				if(log.id == action.payload.id) {
					log = action.payload;
				} 
			});
			return state;
		default:
			return state;
	}
}