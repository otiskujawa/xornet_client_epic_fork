import { createApp } from 'vue'
import app from './app.vue'
import router from './router'
import socket from '@/services/socket.js';

createApp(app).use(router).mount('#app')
