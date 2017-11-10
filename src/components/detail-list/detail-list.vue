<!-- 详情页面（包括歌手、专辑、榜单） -->
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
          // 判断传进来的歌曲列表的类型
          if(this.types === 'singer') {
            return this._getSingerDetail()
          } else if(this.types === 'rank') {
            return this._getRankDetail()
          } else {
            return this._getAlbumDetail()
          };
        },
        methods: {
        _getSingerDetail() {
            return getSingerDetail(this.listMid).then((res) => {
              if (res.code === 0) {
                this.img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.listMid}.jpg?max_age=2592000`;
                return res.data.list
              }
            }).then((res) => {
              this.songs = this.handleList(res);
            })
          },
          _getRankDetail() {
            return getMusicList(this.listMid).then((res) => {
              if (res.code === 0) {
                this.img = res.topinfo.pic_v12;;
                return res.songlist;
              }
            }).then((res) => {
              this.songs = this.handleList(res);
            })
          },
          _getAlbumDetail() {
            return getAlbumDetail(this.listMid).then((res) => {
              if (res.code === 0) {
                this.img = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${res.data.mid}.jpg?max_age=2592000`;
                return res.data.list;
              }
            }).then((res) => {
              this.songs = this.handleList(res);
            })
          },
          handleList(list) {
            const List = [];
            list.forEach((item) => {
              // api返回的json数据格式不同
              if(this.types === 'singer') {
                List.push(handleSong(item.musicData));
              } else if(this.types === 'rank') {
                List.push(handleSong(item.data));
              } else {
                List.push(handleSong(item));
              };
            });
            return List;
          }
        }
    }
</script>

<style>
    
</style>