import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader.vue'
import messagePlugin from './utils/message.plugin'
import tooltipDirective from './directives/tooltip.directive'
import Paginate from "vuejs-paginate-next"
import { createI18n } from 'vue-i18n';
import messages from './locales/messages'
import 'materialize-css/dist/js/materialize.min.js'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD7cByIFoVes8FvevOd6mvcr4GhrhFkaFk",
  authDomain: "vue-crm-9826c.firebaseapp.com",
  databaseURL: "https://vue-crm-9826c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-crm-9826c",
  storageBucket: "vue-crm-9826c.appspot.com",
  messagingSenderId: "374968797446",
  appId: "1:374968797446:web:3d32562eda55e5fb3e7687",
  measurementId: "G-3FXSQ0YBS9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()

const i18n = createI18n({
  locale: 'en',
  messages
})

let vueApp

onAuthStateChanged(auth, (user) => {
  if (!vueApp) {
    vueApp = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .component('Loader', Loader)
      .use(Paginate)
      .use(i18n)
      .directive('tooltip', tooltipDirective)
      .mount('#app');
  }
})







