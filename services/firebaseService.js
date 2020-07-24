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
    addItemAutoGenId = async (path, doc) => {
        return await firebase.firestore().collection(path).add(doc);
    }
    updateItem = async (path, id, update) => {
        const docRef = firebase.firestore().collection(path).doc(id);
        return await docRef.update(update);
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
    getInvites = async (uid) => {
        return firebase.firestore().collection('mates')
            .where('mateUid', '==', uid)
            .where('approved', '==', false)
            .get()
            .then(
                snapshot => _.map(snapshot.docs, (d) => {return d.data()})
            );
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
    getMates = async (uid) => {
        const snapshotPromise1 = firebase.firestore().collection('mates')
            .where('mateUid', '==', uid)
            .where('approved', '==', true).get();
        const snapshotPromise2 = firebase.firestore().collection('mates')
            .where('uid', '==', uid)
            .where('approved', '==', true).get();
        return Promise.all([snapshotPromise1, snapshotPromise2]).then(snapshots => {
            return _.merge(
                        _.map(snapshots[0].docs, (doc) => {
                        return doc.data();
                        }), _.map(snapshots[1].docs, (doc) => {
                            return doc.data();
                        })
                 );
        });
    }
    deleteRequest = async (id) => {
        return this.removeItem('mates', id);
    }
    approveRejectRequest = async (uid, mateUid, accept) => {
        const snapshotPromise = firebase.firestore().collection('mates')
            .where('uid', '==', uid)
            .where('mateUid', '==', mateUid)
            .where('approved', '==', false).get();
        snapshotPromise.then(snapshot => {
            const toUpdateId  = snapshot.docs[0].id;
            return accept ? this.updateItem('mates', toUpdateId, {approved: true}) :
                this.removeItem('mates', toUpdateId);
        });
    }
    rejectRequest = async (uid, mateUid) => {

    }
    forUsersPath(query) {
        return query;
    }
}
