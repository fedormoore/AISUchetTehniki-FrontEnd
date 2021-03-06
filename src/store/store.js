import {createStore, applyMiddleware} from "redux";
// import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "../reducers/rootReducer";

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware))

// const store = createStore(rootReducer, compose(
//     applyMiddleware(
//         thunk
//     ),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

export default store;