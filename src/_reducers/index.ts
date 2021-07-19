import { combineReducers } from 'redux';
import { authentication } from './login.reducer';
import { employee } from './employee.reducer';
import { notification } from './notification.reducer';

const rootReducer = combineReducers({
    authentication,
    employee,
    notification
});

export default rootReducer;