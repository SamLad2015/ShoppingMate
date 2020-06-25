import {SET_LISTS, SET_INIT_LISTS, SET_LIST, SET_ITEMS, ADD_LIST} from '../constants';
import * as _ from 'lodash';
const initialState = {
    lists: [],
    list: {items: []}
};
const listReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INIT_LISTS:
            return {
                ...state,
                lists:action.payload
            }
        case SET_LISTS:
            return {
                ...state,
                lists:action.payload
            };
        case ADD_LIST:
            if (!state.lists) {
                state.lists = [];
            } else {
                state.lists = _.filter(state.lists, (l) => {
                    return l.id !== action.payload.id;
                })
            }
            state.lists.push(action.payload);
            return {
                ...state,
            };
        case SET_LIST:
            return {
                ...state,
                list:action.payload
            };
        case SET_ITEMS:
            if (!state.list) {
                state.list = {item:[]};
            }
            state.list.items = action.payload;
            return {
                ...state
            };
        default:
            return state;
    }
}
export default listReducer;
