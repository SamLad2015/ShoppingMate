import React from 'react';
import storeFunc from "./store/configureStore";
import { Provider } from 'react-redux';
import Nav from './screens/Nav';

const store = storeFunc.configureStore()

export default class App extends React.Component {
    constructor() {
        super();
        store.dispatch(storeFunc.getAsyncStorage());
    }
    render() {
        return (
            <Provider store={store}>
                <Nav />
            </Provider>
        );
    }
};
