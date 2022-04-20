import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import employee from './reducers/employee'

export default combineReducers({
	form: formReducer,
	employee,
});