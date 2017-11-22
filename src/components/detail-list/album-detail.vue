<!-- 专辑详情页面 -->
<template>
    <music-list :music-list="songs" :music-img="img" :showPopup="false"></music-list>
</template>
<script>
import {mapGetters} from 'vuex';
import MusicList from '../../base/music-list/music-list.vue';
import {savePlay} from '../../api/localStorage.js';
import {handleSong} from '../../base/song.js';
import {getAlbumDetail} from '../../api/search.js';
 export default {
  components: {
      MusicList
  },
  data() {
      return {
          songs:[],
          img:''
      }
  },
  computed: {
      ...mapGetters([
        'detailMid',
        ])
  },
  created() {
    this._getAlbumDetail()
  },
  methods: {
    _getAlbumDetail() {
      return getAlbumDetail(this.detailMid).then((res) => {
        if (res.code === 0) {
          this.img = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${res.data.mid}.jpg?max_age=2592000`;
          this.songs = this.handleList(res.data.list);
        }
      })
    },
    handleList(list) {
      if(!list) {
        this.$router.push('/find');
      }
      const List = [];
      list.forEach((item) => {
        List.push(handleSong(item));
      });
      return List;
    }
  }
}
</script>