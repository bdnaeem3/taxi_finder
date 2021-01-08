import { combineReducers } from 'redux';

// Reducers
import taxi from './reducers/taxiReducer';
import map from './reducers/mapReducer';

export default combineReducers({
  taxi,
  map
});