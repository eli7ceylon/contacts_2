// import counterReducers from "./counter";
import contactsListReducer from "./contactsList";
import {combineReducers} from "redux";
import newContactReducer from "./newContact";

const rootReducers = combineReducers({
    contacts: contactsListReducer,
    // newContact : newContactReducer
});
export default rootReducers;


