<template>
    <music-list :music-list="songs" :music-img="img"></music-list>
</template>
<script>
import MusicList from '../../base/music-list/music-list.vue';
import {savePlay} from '../../api/localStorage.js';
import {handleSong} from '../../base/song.js';
import {getMusicList} from '../../api/rank.js';
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
                return this.$store.state.musicList;
            }
        },
        created() {
          this._getMusicList()
        },
        methods: {
        _getMusicList() {
            if (!this.topList.id) {
              this.$router.push('/bangdan')
              return
            }
            getMusicList(this.topList.id).then((res) => {
              if (res.code === 0) {
                this.img = res.topinfo.pic_v12;
                this.songs = this.handleList(res.songlist);
              }
            })
          },
          handleList(list) {
            const List = [];
            list.forEach((item) => {
              let music = handleSong(item.data)
            List.push(music);
            });
            return List;
          }
        }
    }
</script>

<style>
</style>