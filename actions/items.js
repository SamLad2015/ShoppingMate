import { SET_ITEMS } from '../constants';
export function setItems(items) {
    return {
        type: SET_ITEMS,
        payload: items
    }
}
