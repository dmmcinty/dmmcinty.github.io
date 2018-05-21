import { CREATE_RESULT } from '../actions';
import _ from 'lodash';

export default function(state = '', action) {
	switch (action.type) {
		case CREATE_RESULT:
			let result = ''; 
			let added = '### Added';
			let changed = '### Changed';
			let removed = '### Removed';
			let fixed = '### Fixed';
			_.map(action.payload.data, log => {
				const logItem = `- [#${log.number}](${log.html_url}) ${log.title}.`;
				if(log.category == 'Added') {
					added += '\n' + logItem;
				}
				if(log.category == 'Changed') {
					changed += '\n' + logItem;
				}
				if(log.category == 'Removed') {
					removed += '\n' + logItem;
				}
				if(log.category == 'Fixed') {
					fixed += '\n' + logItem;
				}
			});
			result += added + '\n' + removed + '\n' + changed + '\n' + fixed + '\n';
			console.log(result);
			return result;
		default:
			return state;
	}
}