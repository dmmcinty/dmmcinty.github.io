import { combineReducers } from 'redux';
import logsReducer from './reducer_logs';
import authReducer from './reducer_auth';
import reposReducer from './reducer_repos';
import branchesReducer from './reducer_branches';
import resultReducer from './reducer_result';
import projectReducer from './reducer_projects';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  logs: logsReducer,
  auth: authReducer,
  form: formReducer,
  repos: reposReducer,
  selectedRepo: reposReducer,
  branches: branchesReducer,
  result: resultReducer,
  projects: projectReducer
});

export default rootReducer;
