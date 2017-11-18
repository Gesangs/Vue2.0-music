import {
  saveSearch,
  clearSearch,
  deleteSearch,
  savePlay,
  saveFavorite,
  deleteFavorite,
  loadSearch,
  loadFavorite,
  deletePlay,
  loadPlay,
  clearAll
} from '../api/localStorage.js'

const mutations = {
  setpopupShow(state, bool) {
    state.popupShow = bool;
  },
  setdialogShow(state, bool) {
    state.dialogShow = bool;
  },
  setdialogMsg(state, msg) {
    state.dialogMsg = msg;
  },
  setDisplay(state, bool) {
    state.isDisplay = bool;
  },
  setDetailMid(state, mid) {
    state.detailMid = mid;
  },
  setTopUrl(state, musicimg) {
    state.musicImg = musicimg;
  },
  playMusic(state, data) {
    state.Music = data;
  },
  selectmusic(state,music) {
    state.selectMusic = music;
    state.popupShow = true;
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
  insertCurrentList(state, music) {
    let list = state.currentList;
    let index = list.findIndex((item) => {
        return item.id === music.id;
      })
    if(index > -1) {
      list.splice(index, 1);
    }
    list.splice(state.Music.index + 1, 0, music)
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
  },
  delOld(state, music) {
    deletePlay(music)
    state.oldMusic = loadPlay();
  }
}

export default mutations