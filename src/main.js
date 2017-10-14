import Vue from 'vue';
import VueFormWizard from 'vue-form-wizard'
import Vuelidate from 'vuelidate'
import App from './App.vue'

Vue.use(VueFormWizard);
Vue.use(Vuelidate);

window.$ = window.jQuery = require("jquery");

Vue.component('step0', require('./components/Step0.vue'));
Vue.component('step1', require('./components/Step1.vue'));
Vue.component('step2', require('./components/Step2.vue'));

new Vue({
    el: '#app',
    render: h => h(App)
});