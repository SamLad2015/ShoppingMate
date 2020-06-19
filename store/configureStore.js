import { createStore, combineReducers } from 'redux';
import itemsReducer from '../reducers/itemsReducer';
const rootReducer = combineReducers(
    { items: itemsReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;
