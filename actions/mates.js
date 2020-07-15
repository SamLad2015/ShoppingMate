import {SET_MATES, ADD_MATE, REMOVE_MATE} from '../constants';
export function setUser(uid) {
    return {
        type: SET_MATES,
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
export function removeMate(id) {
    return {
        type: REMOVE_MATE,
        payload: id
    }
}
