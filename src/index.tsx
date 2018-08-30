import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import { reduceStoreState } from './reducers';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const logger = createLogger({
    collapsed: true
});


const store = createStore(reduceStoreState, {
    queryString: "ernie",
    data: JSON.parse("[]")
},  applyMiddleware(logger, thunk));


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
