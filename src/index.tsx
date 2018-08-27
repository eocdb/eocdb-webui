import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { reduceStoreState } from './reducers';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    collapsed: true
});


const store = createStore(reduceStoreState, {
    queryString: "",
},  applyMiddleware(logger));


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
