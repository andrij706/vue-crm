import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const actions = {
    async login({ dispatch, commit }, { email, password }) {
        const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, email, password);
      }catch (error) {
        commit('setError', error)
        throw (error)
      }
    },
    async register({dispatch, commit}, {email, password, name}){
        const auth = getAuth();
        const db = getDatabase();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, name)
            const userId = userCredential.user.uid;
            const recordsRef = ref(db, `/users/${userId}/info`);
            await set(recordsRef, {bill: 10000, name});
        }catch (error){
            commit('setError', error)
            throw (error)
        }
    },
    async logout({commit}){
        const auth = getAuth();
        await signOut(auth)
        commit('clearInfo')
    }
};

  export default {
    actions
  };