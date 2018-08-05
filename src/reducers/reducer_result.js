import { CREATE_RESULT } from '../actions';

export default function(state = '', action) {
	switch (action.type) {
		case CREATE_RESULT:
			let result = ''; 
			let added = '### Added';
			let changed = '### Changed';
			let removed = '### Removed';
			let fixed = '### Fixed';
			action.payload.map(log => {
				const logItem = `- [#${log.number}](${log.html_url}) ${log.title}.`;
				if(log.category === 'Added') {
					added += '\n' + logItem;
				} else if (log.category === 'Changed') {
					changed += '\n' + logItem;
				} else if(log.category === 'Removed') {
					removed += '\n' + logItem;
				} else if(log.category === 'Fixed') {
					fixed += '\n' + logItem;
				}
			});

			if(added === '### Added') {
				added = '';
			} else added += '\n\n';

			if(changed === '### Changed') {
				changed = '';
			} else changed += '\n\n';

			if(removed === '### Removed') {
				removed = '';
			} else removed += '\n\n';

			if(fixed === '### Fixed') {
				fixed = '';
			} else fixed += '\n\n';

			result += added + changed + removed + fixed + '\n';
			return result;
		default:
			return state;
	}
}