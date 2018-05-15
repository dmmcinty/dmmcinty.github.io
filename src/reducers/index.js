import { combineReducers } from 'redux';
import logsReducer from './reducer_logs';
import authReducer from './reducer_auth';
import reposReducer from './reducer_repos';
import selectRepo from './reducer_repos';
import branchesReducer from './reducer_branches';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  logs: logsReducer,
  auth: authReducer,
  form: formReducer,
  repos: reposReducer,
  selectedRepo: reposReducer,
  branches: branchesReducer
});

export default rootReducer;
