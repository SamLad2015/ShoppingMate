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
        const entityRef = firebase.firestore().collection(path)
        const snapshot =  await entityRef.where(node, operator, value).limit(1).get();
        snapshot.forEach(doc => {
            outputs.push(Object.assign(doc.data(), {id: doc.id}));
        });
        return multiple ? outputs : outputs[0];
    }
}
