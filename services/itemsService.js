import {AsyncStorage} from "react-native";
import * as _ from 'lodash';

export default class ItemsService {
    async getListsFromStorage() {
        return await AsyncStorage.getItem('lists', null);
    }
    async getListFromStorage(listId) {
        const lists = await AsyncStorage.getItem('lists', null);
        return _.find(JSON.parse(lists), {id: listId});
    }
    async getListItemFromStorage(listId, itemCode) {
        const lists = await AsyncStorage.getItem('lists', null);
        const list = _.find(JSON.parse(lists), {id: listId});
        return _.find(list.items, {value: itemCode});
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
    async deleteListFromStorage(list){
        let lists = await this.getListsFromStorage();
        lists = JSON.parse(lists);
        await this.setListsIntoStorage(_.reject(lists, {id: list.id}));
        return list;
    }
}

