import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';

import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

Vue.use(VueOnsen);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
