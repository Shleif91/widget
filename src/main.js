import Vue from 'vue';
import VueFormWizard from 'vue-form-wizard'
import Vuelidate from 'vuelidate'
import App from './App.vue'

Vue.use(VueFormWizard);
Vue.use(Vuelidate);

window.$ = window.jQuery = require("jquery");

Vue.component('leed-form', require('./components/form/LeedForm.vue'));
Vue.component('step0', require('./components/form/Step0.vue'));
Vue.component('step1', require('./components/form/Step1.vue'));
Vue.component('step2', require('./components/form/Step2.vue'));
Vue.component('step3', require('./components/form/Step3.vue'));
Vue.component('result', require('./components/Result.vue'));

new Vue({
    el: '#app',
    render: h => h(App)
});