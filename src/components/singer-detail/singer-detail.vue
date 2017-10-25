<template>
    <music-list :music-list="songs" :music-img="img"></music-list>
</template>
<script>
import MusicList from '../../base/music-list/music-list.vue';
import {savePlay} from '../../api/localStorage.js';
import {handleSong} from '../../base/song.js';
import {getSingerDetail} from '../../api/search.js'
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
            topList() {
                return this.$store.state.musicList.mid;
            }
        },
        created() {
          this._getSingerDetail()
        },
        methods: {
        _getSingerDetail() {
            if (!this.topList) {
              this.$router.push('/find')
              return
            }
            getSingerDetail(this.topList).then((res) => {
              if (res.code === 0) {
                this.img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.topList}.jpg?max_age=2592000`;
                this.songs = this.handleList(res.data.list);
              }
            })
          },
          handleList(list) {
            const List = [];
            list.forEach((item) => {
              let music = handleSong(item.musicData)
            List.push(music);
            });
            return List;
          }
        }
    }
</script>

<style>
    
</style>