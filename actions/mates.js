import {
    SET_MATES,
    ADD_MATE,
    REMOVE_MATE,
    SET_USER,
    SET_REQUESTS,
    SET_FRIENDS,
    ACCEPT_REQUEST,
    REJECT_REQUEST
} from '../constants';
export function setUser(uid) {
    return {
        type: SET_USER,
        payload: uid
    }
}
export function setMates(mates) {
    return {
        type: SET_MATES,
        payload: mates
    }
}
export function addMate(mate) {
    return {
        type: ADD_MATE,
        payload: mate
    }
}
export function removeMate(removeInfo) {
    return {
        type: REMOVE_MATE,
        payload: removeInfo
    }
}
export function setRequests(requests) {
    return {
        type: SET_REQUESTS,
        payload: requests
    }
}
export function acceptRequest(request) {
    return {
        type: ACCEPT_REQUEST,
        payload: request
    }
}
export function rejectRequest(request) {
    return {
        type: REJECT_REQUEST,
        payload: request
    }
}
export function setFriends(friends) {
    return {
        type: SET_FRIENDS,
        payload: friends
    }
}
