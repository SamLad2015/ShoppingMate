import { SET_ITEMS, SET_LIST } from '../constants';
const initialState = {
    name: '',
    items: []
};
const itemsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ITEMS:
            return {
                ...state,
                items:action.payload
            };
        case SET_LIST:
            return {
                ...state,
                name:action.payload
            };
        default:
            return state;
    }
}
export default itemsReducer;
