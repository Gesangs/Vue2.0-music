import Vue from 'vue';
import Router from 'vue-router';
import Axios from 'axios';
import Vuex from 'vuex';

import App from './App';
import music from './components/music/music.vue';
import find from './components/find/find.vue';
import bangdan from './components/bangdan/bangdan.vue';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Vuex);
Vue.prototype.$ajax = Axios;
/* eslint-disable no-new */

const routes = [
	{path: '/music', component: music},
	{path: '/find', component: find},
	{path: '/bangdan', component: bangdan}
];

const router = new Router({
	routes:routes,
});
const store = new Vuex.Store({
    state: {
        isPlaying: false,
        Music: {
            img:'',
            music: '',
            music_name: '',
            singer: '',
            id: ''
        },
        audio: {},
        oldMusic: [],
        loveMusic: [],
        searchHistory: []
    },
    mutations: {
        playMusic(state, data) {
            state.Music.img = data.img;
            state.Music.music = data.music;
            state.Music.music_name = data.music_name;
            state.Music.singer = data.singer;
            state.Music.id = data.id;
        },
        isplay(state, flag) {
          state.isPlaying = flag;
        },
        audioDom(state, dom) {
            state.audio = dom;
        },
        addLove(state, music) {
            state.loveMusic.push(music);
        },
        addHistory(state, musics) {
            state.searchHistory.push(musics);
            let hash = {};
            // 数组去重
            state.searchHistory = state.searchHistory.reduce(function(item,next) {
                hash[next] ? '' : hash[next] = true && item.push(next);
                return item;
            }, [])
        },
        addOld(state, music) {
            state.oldMusic.push(music);
            let hash = {};
            // 数组去重
            state.oldMusic = state.oldMusic.reduce(function(item,next) {
                hash[next.id] ? '' : hash[next.id] = true && item.push(next);
                return item;
            }, [])
        }
    }
})

router.push('/find');

const app = new Vue({
	router,
    store,
	template: '<App/>',
	components: { App },
    data: {
        eventBus: new Vue()
    }
}).$mount('#app')

