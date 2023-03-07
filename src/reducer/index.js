import { combineReducers } from 'redux';
import requestUpdate from './requestUpdate' 
import getUser from './users'
import getTaskDetails from './getTaskDetails'
const rootReducer = combineReducers({
     columns : requestUpdate,
     users: getUser,
     taskdetail :getTaskDetails
})
export default rootReducer;
