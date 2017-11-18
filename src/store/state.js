import {
  loadSearch,
  loadFavorite,
  loadPlay,
} from '../api/localStorage.js';
import Song from '../base/song.js';


const state = {
    isPlaying: false,
    Music: {
        id: '',
        mid: '',
        singer: {
          name: '',
          id: '',
          mid:''
        },
        name: '',
        album: {
          id: '',
          mid: '',
          name: ''
        },
        duration: '',
        image: '../../static/defa.jpg',
        url: ''
    },
    selectMusic: {},
    audio: {},
    oldMusic: loadPlay(),
    loveMusic: loadFavorite(),
    searchHistory: loadSearch(),
    currentList: [],
    detailMid: '',
    isDisplay: false,
    dialogMsg: 'error',
    dialogShow: false,
    popupShow: false,
}

export default state