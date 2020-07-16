import {firebase} from "../firebase/firebase.config";

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
    addItem = async (path, doc) => {
        return await firebase.firestore().collection(path).add(doc);
    }
    removeItem = async (path, docId) => {
        return await firebase.firestore().collection(path).doc(docId).delete();
    }
    searchItem = async (path, node, operator, value, multiple = false) => {
        let outputs = [];
        const isUsersPath = path === 'users';
        const entityRefQuery = firebase.firestore().collection(path)
            .where(node, operator, isUsersPath? value.toLowerCase() : value);
        const snapshot = multiple ? await this.forUsersPath(entityRefQuery) :
            await this.forUsersPath(entityRefQuery).limit(1);
        return snapshot.get().then(snapshot => {
            snapshot.forEach(doc => {
                outputs.push(Object.assign(doc.data(), {id: doc.id}));
            });
            return multiple ? outputs : outputs[0];
        });
    }
    forUsersPath(query) {
        return query;
    }
}
