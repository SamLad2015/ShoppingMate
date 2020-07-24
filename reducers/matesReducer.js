import {
    ACCEPT_REQUEST,
    ADD_MATE,
    REJECT_REQUEST,
    REMOVE_MATE,
    SET_FRIENDS,
    SET_MATES,
    SET_REQUESTS,
    SET_USER
} from '../constants';
import * as _ from "lodash";

const initialState = {
        uid: null,
        friends: [],
        invites: [],
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
                invites:action.payload
            };
        case ADD_MATE:
            if (!state.invites) {
                state.invites = [];
            } else {
                state.invites = _.reject(state.invites, {uid: action.payload.uid});
            }
            state.invites.push(action.payload);
            return {
                ...state,
            };
        case REMOVE_MATE:
            if (!state.invites) {
                state.invites = [];
            } else {
                state.invites = _.reject(state.invites, {uid: action.payload});
            }
            return {
                ...state,
            };
        case SET_REQUESTS:
            return {
                ...state,
                requests:action.payload
            };
        case ACCEPT_REQUEST:
            state.invites = _.reject(state.invites, {uid: action.payload.uid});
            if (!state.friends) {
                state.friends = [];
            } else {
                state.friends = _.reject(state.friends, {uid: action.payload.uid});
            }
            state.friends.push(action.payload);
            return {
                ...state
            };
        case REJECT_REQUEST:
            state.invites = _.reject(state.invites, {uid: action.payload.uid});
            return {
                ...state
            };
        case SET_FRIENDS:
            return {
                ...state,
                friends:action.payload
            };
        default:
            return state;
    }
}
export default matesReducer;
