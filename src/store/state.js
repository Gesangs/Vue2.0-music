import {
  loadSearch,
  loadFavorite,
  loadPlay,
} from '../api/localStorage.js'

const state = {
    isPlaying: false,
    Music: {},
    selectMusic: {},
    audio: {},
    oldMusic: loadPlay(),
    loveMusic: loadFavorite(),
    searchHistory: loadSearch(),
    currentList: [],
    detailMid: '',
    detailTypes: '',
    musicImg: '',
    isDisplay: false,
    dialogMsg: 'error',
    dialogShow: false,
    popupShow: false
}

export default state