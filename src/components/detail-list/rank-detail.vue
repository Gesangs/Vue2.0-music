<!-- 榜单详情页面 -->
<template>
    <music-list :music-list="songs" :music-img="img"></music-list>
</template>
<script>
import { mapGetters } from "vuex";
import MusicList from "../../base/music-list/music-list.vue";
import { savePlay } from "../../api/localStorage.js";
import { handleSong } from "../../base/song.js";
import { getMusicList } from "../../api/rank.js";
export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: [],
      img: ""
    };
  },
  computed: {
    ...mapGetters(["detailMid"])
  },
  created() {
    this._getRankDetail();
  },
  methods: {
    _getRankDetail() {
      return getMusicList(this.detailMid).then(res => {
        if (res.code === 0) {
          this.img = res.topinfo.pic_v12;
          this.songs = this.handleList(res.songlist);
        }
      });
    },
    handleList(list) {
      if (!list) {
        this.$router.push("/find");
      }
      const List = [];
      list.forEach(item => {
        List.push(handleSong(item.data));
      });
      return List;
    }
  }
};
</script>

<style>

</style>