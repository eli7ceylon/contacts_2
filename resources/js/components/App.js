import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ContactsList from "./ContactsList";
import NewContact from "./NewContact";
import {createStore} from 'redux';
import rootReducer from  '../reducers';
import {Provider} from 'react-redux';
const redux = require('redux');
const applyMiddleWare = redux.applyMiddleware;
const thunkMiddleWare = require('redux-thunk').default;

let store = createStore(rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    applyMiddleWare(thunkMiddleWare) );

function App() {
    return (
            <React.StrictMode>
                <Router>
                    <Switch>
                        <Route path="/contacts/new" component={NewContact}></Route>
                        <Route path="/contacts/:contactId" component={NewContact} ></Route>
                        <Route path="/" component={ContactsList}/>
                    </Switch>
                </Router>
            </React.StrictMode>
    );
}
export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))
}
