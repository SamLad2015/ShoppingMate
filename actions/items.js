import {SET_ITEMS, UPDATE_ITEM_COUNT} from '../constants';
export function setItems(items) {
    return {
        type: SET_ITEMS,
        payload: items
    }
}
export function updateItemCount(item) {
    return {
        type: UPDATE_ITEM_COUNT,
        payload: item
    }
}
