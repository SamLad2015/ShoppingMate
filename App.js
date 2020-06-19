import React from 'react';
import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import Nav from './screens/Nav';

const store = configureStore()

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={store}>
                <Nav />
            </Provider>
        );
    }
};
