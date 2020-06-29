import {SET_LISTS, SET_INIT_LISTS, SET_LIST, SET_ITEMS, ADD_LIST, REMOVE_LIST, UPDATE_ITEM_COUNT} from '../constants';
import * as _ from 'lodash';
const initialState = {
    lists: [],
    list: {items: []},
    item: {}
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
                state.lists = _.reject(state.lists, {id: action.payload.id});
            }
            state.lists.push(action.payload);
            return {
                ...state,
            };
        case REMOVE_LIST:
            if (!state.lists) {
                state.lists = [];
            } else {
                state.lists = _.reject(state.lists, {id: action.payload.id});
            }
            return {
                ...state,
            };
        case UPDATE_ITEM_COUNT:
            _.find(state.list.items, {value: action.payload.item.value}).count = action.payload.item.count;
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
            const existingItems = state.list.items;
            state.list.items = _.map(action.payload, (i) => {
               const existingItem = _.find(existingItems, {value: i.value});
               i.count = existingItem ? existingItem.count : 1;
               return i;
            });
            return {
                ...state
            };
        default:
            return state;
    }
}
export default listReducer;
