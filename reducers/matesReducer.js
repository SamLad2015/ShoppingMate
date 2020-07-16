import {ADD_MATE, REMOVE_MATE, SET_MATES, SET_REQUESTS, SET_USER} from '../constants';
import * as _ from "lodash";

const initialState = {
        uid: null,
        mates: [],
        requests: []
};
const matesReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                uid:action.payload
            };
        case SET_MATES:
            return {
                ...state,
                mates:action.payload
            };
        case ADD_MATE:
            if (!state.mates) {
                state.mates = [];
            } else {
                state.mates = _.reject(state.mates, {uid: action.payload.uid});
            }
            state.mates.push(action.payload);
            return {
                ...state,
            };
        case REMOVE_MATE:
            if (!state.mates) {
                state.mates = [];
            } else {
                state.mates = _.reject(state.mates, {uid: action.payload});
            }
            return {
                ...state,
            };
        case SET_REQUESTS:
            return {
                ...state,
                requests:action.payload
            };
        default:
            return state;
    }
}
export default matesReducer;
