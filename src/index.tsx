import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { appReducer } from './reducers/appReducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'typeface-roboto';
import { updateStoreInfo } from "./actions/configActions";

const logger = createLogger({collapsed: true});
const store = createStore(appReducer, applyMiddleware(thunk, logger));

/*
for (let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    const query = localStorage.getItem(localStorage.key(i));


}

*/

store.dispatch(updateStoreInfo() as any);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
