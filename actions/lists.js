import {SET_LISTS, SET_INIT_LISTS, SET_LIST, ADD_LIST} from '../constants';
export function setLists(lists) {
    return {
        type: SET_LISTS,
        payload: lists
    }
}
export function setList(list) {
    return {
        type: SET_LIST,
        payload: list
    }
}
export function addList(list) {
    return {
        type: ADD_LIST,
        payload: list
    }
}
export function setInit (lists) {
    return {
        type: SET_INIT_LISTS,
        payload: lists
    };
}
