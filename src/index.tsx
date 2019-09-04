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
import { SearchHistoryItem } from "./types/dataset";
import { updateSearchHistory } from "./actions/findActions";
import { getLinks } from "./actions/adminActions";

const logger = createLogger({collapsed: true});
const store = createStore(appReducer, applyMiddleware(thunk, logger));

let history: SearchHistoryItem[] = [];

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && !key.includes('ocdb')) {
        const query = localStorage.getItem(key);
        if (query) {
            history.push({key: key, query: JSON.parse(query)})
        }
    }
}


store.dispatch(updateSearchHistory(history));
store.dispatch(updateStoreInfo() as any);
store.dispatch(getLinks() as any);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
