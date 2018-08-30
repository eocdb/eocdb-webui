import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {

    let result = null;
    const onQueryMeasurements = (s: string) => {
        result = s;
    };
    console.log(result);

    const div = document.createElement('div');
    ReactDOM.render(<App queryString={""} onQueryMeasurements={onQueryMeasurements}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
