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
  loadPlay
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
const SingerDetail = (resolve) => {
  import ('./components/singer-detail/singer-detail.vue').then((module) => {
    resolve(module)
  })
}
const RankDetail = (resolve) => {
  import ('./components/rank-detail/rank-detail.vue').then((module) => {
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
  children: [{
    path: ':id',
    component: SingerDetail
  }]
},
{
  path: '/bangdan',
  component: bangdan,
  children: [{
    path: ':id',
    component: RankDetail
  }]
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
    Music: {
      image: '../static/16pic_1792828_b.webp',
      url: '',
      name: '',
      singer: '',
      id: '',
      mid: '',
      index: ''
    },
    audio: {},
    oldMusic: loadPlay(),
    loveMusic: loadFavorite(),
    currentList: [],
    musicList: {},
    musicImg: '',
    searchHistory: loadSearch()
  },
  mutations: {
    setToplist(state, musiclist) {
      state.musicList = musiclist;
    },
    setTopUrl(state, musicimg) {
      state.musicImg = musicimg;
    },
    playMusic(state, data) {
      state.Music.image = data.image;
      state.Music.url = data.url;
      state.Music.name = data.name;
      state.Music.singer = data.singer;
      state.Music.id = data.id;
      state.Music.mid = data.mid;
      state.Music.index = data.index;
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
    addHistory(state, musics) {
      if (musics === 0) {
        state.searchHistory.length = 0;
        clearSearch();
      } else {
        state.searchHistory.push(musics);
        saveSearch(musics)
        state.searchHistory = quchong(state.searchHistory)
      }
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
