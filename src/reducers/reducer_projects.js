import { FETCH_PROJECTS, SELECT_PROJECT } from '../actions';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_PROJECTS:
			return action.payload;
		case SELECT_PROJECT:
			state.forEach(project => {
				if (project.name === action.payload) {
					project.selected = true;
				} else {
					project.selected = false;
				}
			});
			return state;
		default:
			return state;
	}
}