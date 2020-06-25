import {AsyncStorage} from "react-native";
import * as _ from 'lodash';

export default class ItemsService {
    async getListsFromStorage() {
        return await AsyncStorage.getItem('lists');
    }
    async getListFromStorage(listId) {
        const lists = await AsyncStorage.getItem('lists');
        return _.find(JSON.parse(lists), {id: listId});
    }
    async setListsIntoStorage(lists) {
        return await AsyncStorage.setItem('lists',JSON.stringify(lists));
    }
    async saveListIntoStorage(list) {
        let lists = await this.getListsFromStorage();
        lists = JSON.parse(lists) || [];
        if (list.id < 0 ) {
            list.id = (_.maxBy(lists, 'id') ? _.maxBy(lists, 'id').id + 1 : 0) || 0;
        } else {
            lists = _.filter(lists, (l) => {return l.id !== list.id})
        }
        lists.push(list);
        await this.setListsIntoStorage(lists);
        return list;
    }
}

