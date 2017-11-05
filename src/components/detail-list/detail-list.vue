<template>
    <music-list :music-list="songs" :music-img="img"></music-list>
</template>
<script>
import MusicList from '../../base/music-list/music-list.vue';
import {savePlay} from '../../api/localStorage.js';
import {handleSong} from '../../base/song.js';
import {getSingerDetail,getAlbumDetail} from '../../api/search.js';
import {getMusicList} from '../../api/rank.js'
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
            listMid() {
                return this.$store.state.detailMid;
            },
            types() {
              return this.$store.state.detailTypes;
            }
        },
        created() {
          if(this.types === 'singer') {
            this._getSingerDetail()
          } else if(this.types === 'rank') {
            this._getRankDetail()
          } else {
            this._getAlbumDetail()
          };
        },
        methods: {
        _getSingerDetail() {
            getSingerDetail(this.listMid).then((res) => {
              if (res.code === 0) {
                this.img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.listMid}.jpg?max_age=2592000`;
                this.songs = this.handleList(res.data.list);
              }
            })
          },
          _getRankDetail() {
            getMusicList(this.listMid).then((res) => {
              if (res.code === 0) {
                this.img = res.topinfo.pic_v12;;
                this.songs = this.handleList(res.songlist);
              }
            })
          },
          _getAlbumDetail() {
            getAlbumDetail(this.listMid).then((res) => {
              if (res.code === 0) {
                this.img = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${res.data.mid}.jpg?max_age=2592000`;
                this.songs = this.handleList(res.data.list);
              }
            })
          },
          handleList(list) {
            const List = [];
            list.forEach((item) => {
              if(this.types === 'singer') {
                var items = item.musicData;
              } else if(this.types === 'rank') {
                var items = item.data;
              } else {
                var items = item;
              };
              let music = handleSong(items);
            List.push(music);
            });
            return List;
          }
        }
    }
</script>

<style>
    
</style>