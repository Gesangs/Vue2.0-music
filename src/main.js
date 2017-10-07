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
            img:'http://imgcache.qq.com/music/photo/album_300/82/300_albumpic_35182_0.jpg',
            music: 'http://ws.stream.qqmusic.qq.com/9059607.m4a?fromtag=46',
            music_name: '不要说话',
            singer: '陈奕迅',
            id: '9059607',
            mid: '002B2EAA3brD5b',
            index:''
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
            state.Music.mid = data.mid;
        },
        isplay(state, flag) {
          state.isPlaying = flag;
        },
        audioDom(state, dom) {
            state.audio = dom;
        },
        setLove(state, flag) {
            state.Music.isLove = flag;
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
        addLove(state, musics) {
            state.loveMusic.push(musics);
            let hash = {};
            // 数组去重
            state.loveMusic = state.loveMusic.reduce(function(item,next) {
                hash[next.id] ? '' : hash[next.id] = true && item.push(next);
                return item;
            }, [])
        },
        addOld(state, music) {
            if(music == 0) {
                state.oldMusic.length = 0;
            }else{
                state.oldMusic.push(music);
                let hash = {};
                // 数组去重
                state.oldMusic = state.oldMusic.reduce(function(item,next) {
                    hash[next.id] ? '' : hash[next.id] = true && item.push(next);
                    return item;
                }, [])
            }
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

