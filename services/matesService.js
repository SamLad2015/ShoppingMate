import {mates} from '../data/mates.json';
export default class MatesService {
    async getMatesFromStorage() {
        return await mates;
    }
}

