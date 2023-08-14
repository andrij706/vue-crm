import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, get, child, update } from "firebase/database";

export default {
    actions: {
        async fetchCategories ({commit, dispatch}) {
            try {
                const auth = getAuth();
                const userId = auth.currentUser.uid;
                const db = getDatabase();
                const recordsRef = ref(db, `/users/${userId}/categories`);
                const snapshot = await get(recordsRef);
                const categories = snapshot.val() || {};
                
                const cats =[]
                Object.keys(categories).forEach(key =>{
                    cats.push({
                        title: categories[key].title,
                        limit: categories[key].limit,
                        id: key
                    })
                })
                return cats
            } catch (error) {
                commit('setError', error);
                throw error;
            }
        },

        async fetchCategoryById({commit, dispatch}, id) {
            try{
                const auth = getAuth();
                const userId = auth.currentUser.uid;
                const db = getDatabase();
                const recordRef = ref(db, `/users/${userId}/categories`);
                const childRef = child(recordRef, `${id}`)
                const snapshot = await get(childRef);
                const category = snapshot.val() || {}
                return {...category, id}
            }catch (error) {
                commit('setError', error)
                throw error
            }
        },

        async updateCategory({ commit, dispatch }, { title, limit, id }){
            try {
                const auth = getAuth();
                const userId = auth.currentUser.uid;
                const db = getDatabase();
                const recordsRef = ref(db, `/users/${userId}/categories`);
                const childRef = child(recordsRef, `${id}`);
                await update(childRef, {title, limit})
            } catch (error) {
                commit('setError', error);
                throw error;
            }
        },

        async createCategory({ commit }, { title, limit }) {
            try {
                const auth = getAuth();
                const userId = auth.currentUser.uid;
                const db = getDatabase();
                const recordsRef = ref(db, `/users/${userId}/categories`);
                const category = await push(recordsRef, { title, limit });
                return { title, limit, id: category.key };
            } catch (error) {
                commit('setError', error);
                throw error;
            }
        }
    }
};