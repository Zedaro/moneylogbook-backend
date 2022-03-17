/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
//const AppComponent = require("./components/AppComponent");

window.Vue = require('vue').default;
import App from "./components/App";
import {store} from "./store/store";
import {router} from "./router";
import vuetify from './plugins/vuetify'
import { i18n } from './languages/lang';
import axios from "axios";
import VuexFlash from 'vuex-flash';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
Vue.component('app-component', require('./components/App.vue').default);
Vue.use(VuexFlash, { mixin: true });

//Vue App erstellen und rendern
new Vue({
    el: "#app",
    store,
    router,
    vuetify,
    i18n,
    axios
    /*
  created: function() {
    this.$store.dispatch('setState')
        .then( () => {
            console.log("After setState:");
            console.log(this.$store.getters.getState);
        }) ;
  },
  */
    /*created () {

        store.dispatch('getUserData')
            .then( () => console.log("store state:", this.$store.getters.getState));

    },*/
    //render: h => h(App)
})
