import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client'
import { BASE_URL } from './services/api'
Vue.config.productionTip = false

const socket = socketio(
  process.env.NODE_ENV === 'production'
    ? BASE_URL.replace('https', 'wss')
    : BASE_URL
)
Vue.use(new VueSocketIO({ debug: true, connection: socket }))

new Vue({
  render: h => h(App)
}).$mount('#app')
