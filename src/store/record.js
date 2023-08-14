import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, get, child } from "firebase/database";

export default {
    actions: {
        async createRecord({dispatch, commit}, record){
            try{
                const auth = getAuth();
                const userId = auth.currentUser.uid;
                const db = getDatabase();
                const recordsRef = ref(db, `/users/${userId}/records`);
                return await push(recordsRef, record)
            }catch(error){
                commit('setError', error)
                throw error
            }
        },

        async fetchRecords({dispatch, commit}){
            try{
                const auth = getAuth();
                const userId = auth.currentUser.uid;
                const db = getDatabase();
                const recordsRef = ref(db, `/users/${userId}/records`);
                const snapshot = await get(recordsRef);
                const records = snapshot.val() || {};
                const parseRecords = Object.keys(records).map(key => ({...records[key], id: key}))
                return parseRecords
            }catch (error) {
                commit('setError', error)
                throw error
            }
        },

        async fetchRecordById({dispatch, commit}, id) {
            try{
                const auth = getAuth();
                const userId = auth.currentUser.uid;
                const db = getDatabase();
                const recordRef = ref(db, `/users/${userId}/records`);
                const childRef = child(recordRef, `${id}`)
                const snapshot = await get(childRef);
                const record = snapshot.val() || {};
                return {...record, id}
            } catch (error){
                commit('setError', error)
                throw error
            }
        }
    }
}