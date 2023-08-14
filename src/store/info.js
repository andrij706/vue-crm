import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, update } from "firebase/database";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info){
            state.info = info
        },
        clearInfo (state){
            state.info = {}
        }
    },
    actions: {

        async updateInfo({dispatch, commit, getters}, toUpdate){
            try{
                const auth = getAuth();
                const userId = auth.currentUser.uid;
                const db = getDatabase();
                const newData = {...getters.info, ...toUpdate}
                const recordsRef = ref(db, `/users/${userId}/info`);
                await update(recordsRef, newData)
                commit ('setInfo', newData)
            }catch (error){
                commit('setError', error)
                throw error
            }
        },


        async fetchInfo({ dispatch, commit }) {
            try{ 
                const auth = getAuth();
                const db = getDatabase();
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const snapshot = await get(ref(db, `/users/${userId}/info`));
                    const info = snapshot.exists() ? snapshot.val() : null;
                    commit('setInfo', info);
                }
            }catch(error){
                commit('setError', error)
                throw error
            }
            
        }
    },
    getters: {
        info: s => s.info
    }
}