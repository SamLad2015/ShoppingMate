import {firebase} from "../firebase/firebase.config";
import * as _ from 'lodash';

export default class FirebaseService {
    getItems = async (path) => {
        let outputs = [];
        const entityRef = firebase.firestore().collection(path);
        const snapshotPromise = entityRef.get();
        return snapshotPromise.then(snapshot => {
            snapshot.forEach(doc => {
                outputs.push(Object.assign(doc.data(), {id: doc.id}));
            });
            return outputs;
        });
    }
    getItem = (path, id) => {
        return firebase.firestore().collection(path).doc(id).get();
    }
    addItem = async (path, id, doc) => {
        const docRef = firebase.firestore().collection(path).doc(id);
        return await docRef.set(doc);
    }
    removeItem = async (path, docId) => {
        return await firebase.firestore().collection(path).doc(docId).delete();
    }
    searchItem = async (path, node, operator, value, multiple = false) => {
        let outputs = [];
        const isUsersPath = path === 'users';
        const entityRefQuery = firebase.firestore().collection(path)
            .where(node, operator, (typeof value) === 'string' &&
            isUsersPath ? value.toLowerCase() : value);
        const snapshot = multiple ? await this.forUsersPath(entityRefQuery) :
            await this.forUsersPath(entityRefQuery).limit(1);
        return snapshot.get().then(snapshot => {
            snapshot.forEach(doc => {
                outputs.push(Object.assign(doc.data(), {id: doc.id}));
            });
            return multiple ? outputs : outputs[0];
        });
    }
    getRequests = async (uid) => {
        const snapshotPromise = firebase.firestore().collection('mates')
            .where('uid', '==', uid)
            .where('approved', '==', false).get();
        return snapshotPromise.then(snapshot => {
            const mateUids = _.map(snapshot.docs, (doc) => {
               return doc.data().mateUid;
            });
            return mateUids.length > 0 ? this.searchItem('users', 'uid', 'in', mateUids, true) : [];
        });
    }
    forUsersPath(query) {
        return query;
    }
}
