import { SET_ITEMS, GET_ITEMS } from '../constants';
export function setItems(items) {
    return {
        type: SET_ITEMS,
        payload: items
    }
}
export function getItems(listId) {
    return {
        type: GET_ITEMS,
        payload: listId
    }
}``
