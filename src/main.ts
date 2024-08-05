import {createApp} from 'vue'
import App from './App.vue'
import {loadGames} from "@/gamesLoader";

loadGames().then(() => {
    createApp(App).mount('#app');
});
