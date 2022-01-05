/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
//const AppComponent = require("./components/AppComponent");

window.Vue = require('vue').default;
import App from "./components/App";
//Store
import {store} from "./store/store";
//<editor-fold desc="Router">
import {router} from "./router";
//</editor-fold>
//Vuetify
import vuetify from './plugins/vuetify'
//import i18n
import { i18n } from './languages/lang';
import axios from "axios";

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))



//Vue App erstellen und rendern
new Vue({
    el: "#app",
    store,
    router,
    vuetify,
    i18n,
    axios,
    /*
  created: function() {
    this.$store.dispatch('setState')
        .then( () => {
            console.log("After setState:");
            console.log(this.$store.getters.getState);
        }) ;
  },
  */
    created () {

        //store.dispatch('getAllData');

        store.dispatch('setLocalStorage', false)
            .then( () => console.log(this.$store.getters.getState) );


    },
    render: h => h(App)
})
