import Vue from 'vue';
import Router from 'vue-router';
import Axios from 'axios';
import Vuex from 'vuex';
import VueLazyload from 'vue-lazyload'
import {
  saveSearch,
  clearSearch,
  deleteSearch,
  savePlay,
  saveFavorite,
  deleteFavorite,
  loadSearch,
  loadFavorite,
  loadPlay,
  clearAll
} from './api/localStorage.js'

import App from './App';
import find from './components/find/find.vue';

Vue.use(VueLazyload, {
  loading: require('./components/default.png')
})


const user = (resolve) => {
  import ('./components/user/user.vue').then((module) => {
    resolve(module)
  })
}
const bangdan = (resolve) => {
  import ('./components/bangdan/bangdan.vue').then((module) => {
    resolve(module)
  })
}
const detailList = (resolve) => {
  import ('./components/detail-list/detail-list.vue').then((module) => {
    resolve(module)
  })
}



Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Vuex);
Vue.prototype.$ajax = Axios;
/* eslint-disable no-new */




const routes = [{
  path: '/user',
  component: user
},
{
  path: '/find',
  component: find,
},
{
  path: '/bangdan',
  component: bangdan,
},
{
  path: '/detail',
  component: detailList
}
];

// 添加歌曲到播放历史和搜索历史时去除重复元素
    const quchong = (arr) => {
      let hash = {};
        arr = arr.reduce(function (item, next) {
          hash[next] ? '' : hash[next] = true && item.push(next);
          return item;
        }, []);
        return arr;
    };

const router = new Router({
  routes: routes,
});
const store = new Vuex.Store({
  state: {
    isPlaying: false,
    Music: {},
    audio: {},
    oldMusic: loadPlay(),
    loveMusic: loadFavorite(),
    searchHistory: loadSearch(),
    currentList: [],
    detailMid: '',
    detailTypes: '',
    musicImg: '',
    isDisplay: false
  },
  mutations: {
    setDisplay(state, bool) {
      state.isDisplay = bool;
    },
    setDetailMid(state, mid) {
      state.detailMid = mid;
    },
    setDetailTypes(state, type) {
      state.detailTypes = type;
    },
    setTopUrl(state, musicimg) {
      state.musicImg = musicimg;
    },
    playMusic(state, data) {
      state.Music = data;
    },
    isplay(state, flag) {
      state.isPlaying = flag;
    },
    audioDom(state, dom) {
      state.audio = dom;
    },
    // 添加到播放列表
    pushList(state, list) {
      state.currentList.length = 0;
      list.forEach((item, index) => {
        item = Object.assign({}, item, {
          index: index
        });
        state.currentList.push(item);
      })
    },
    addHistory(state, key) {
      saveSearch(key)
      state.searchHistory = loadSearch();
    },
    delHistory(state, key) {
      deleteSearch(key);
      state.searchHistory = loadSearch();
    },
    clearHistory(state) {
      clearSearch();
      state.searchHistory = loadSearch();
      clearAll()
    },
    addLove(state, musics) {
      saveFavorite(musics);
      state.loveMusic = loadFavorite();
    },
    delLove(state, music) {
      deleteFavorite(music);
      state.loveMusic = loadFavorite();
    },
    addOld(state, music) {
      savePlay(music)
      state.oldMusic = loadPlay();
    }
  }
})


// 默认页
router.push('/find');

const app = new Vue({
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')
