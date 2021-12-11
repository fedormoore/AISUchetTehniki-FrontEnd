import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';
import store from "./store/store";
import ThemeConfig from "./ThemeConfig";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ThemeConfig/>
        </Router>
    </Provider>,
    document.getElementById('root')
);