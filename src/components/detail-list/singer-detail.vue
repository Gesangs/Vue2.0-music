<!-- 歌手详情页面 -->
<template>
    <music-list :music-list="songs" :music-img="img"></music-list>
</template>
<script>
import {mapGetters} from 'vuex';
import MusicList from '../../base/music-list/music-list.vue';
import {savePlay} from '../../api/localStorage.js';
import {handleSong} from '../../base/song.js';
import {getSingerDetail} from '../../api/search.js';
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
          this._getSingerDetail()
        },
        methods: {
        _getSingerDetail() {
            return getSingerDetail(this.detailMid).then((res) => {
              if (res.code === 0) {
                this.img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.detailMid}.jpg?max_age=2592000`;
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
              List.push(handleSong(item.musicData));
            });
            return List;
          }
        }
    }
</script>

<style>
    
</style>