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
      index: '',
      isLove: false
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
      state.Music.isLove = data.isLove;
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
        let hash = {};
        // 数组去重
        state.searchHistory = state.searchHistory.reduce(function (item, next) {
          hash[next] ? '' : hash[next] = true && item.push(next);
          return item;
        }, []);
      }
    },
    addLove(state, musics) {
      state.loveMusic.push(musics);
      saveFavorite(musics);
      console.log(loadFavorite())
      let hash = {};
      // 数组去重
      state.loveMusic = state.loveMusic.reduce(function (item, next) {
        hash[next.id] ? '' : hash[next.id] = true && item.push(next);
        return item;
      }, [])
    },
    delLove(state, music) {
      var index = '';
      deleteFavorite(music);
      state.loveMusic.forEach((item) => {
        if (music.id === item.id) {
          index = i;
          state.loveMusic.splice(index, 1);
        }
      })
    },
    addOld(state, music) {
      state.oldMusic.push(music);
      let hash = {};
      // 数组去重
      state.oldMusic = state.oldMusic.reduce(function (item, next) {
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
  components: {
    App
  }
}).$mount('#app')
