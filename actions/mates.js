import {SET_MATES, ADD_MATE, REMOVE_MATE} from '../constants';
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
export function removeMate(mate) {
    return {
        type: REMOVE_MATE,
        payload: mate
    }
}
