import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import { reduceStoreState } from './reducers';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reduceStoreState, {
    queryString: "",
});


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
