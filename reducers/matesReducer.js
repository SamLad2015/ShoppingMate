import {SET_MATES} from '../constants';

const initialState = {
    list: []
};
const matesReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MATES:
            return {
                ...state,
                lists:action.payload
            };
        default:
            return state;
    }
}
export default matesReducer;
