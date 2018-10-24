import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import apolloProvider from './apollo';
// import { createProvider } from './vue-apollo';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	apolloProvider,
	// apolloProvider: createProvider(),
	render: (h) => h(App)
}).$mount('#app');
