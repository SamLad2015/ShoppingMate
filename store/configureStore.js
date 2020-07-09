import {createStore, combineReducers, applyMiddleware} from 'redux';
import listReducer from "../reducers/listReducer";
import {setInit} from "../actions/lists";
import thunk from "redux-thunk";
import {AsyncStorage} from "react-native";
import matesReducer from "../reducers/matesReducer";
const rootReducer = combineReducers(
    {
        lists: listReducer,
        mates: matesReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}
const getAsyncStorage = () => {
    return (dispatch) => {
        AsyncStorage.getItem('lists')
            .then((result) => {dispatch(setInit(JSON.parse(result)))});
    };
};
export default {configureStore, getAsyncStorage};
