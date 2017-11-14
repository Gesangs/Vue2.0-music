<!-- 详情页面（包括歌手、专辑、榜单） -->
<template>
    <music-list :music-list="songs" :music-img="img"></music-list>
</template>
<script>
import {mapGetters} from 'vuex';
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
            ...mapGetters([
              'detailMid',
              'detailTypes'
              ])
        },
        created() {
          // 判断传进来的歌曲列表的类型
          if(this.detailTypes === 'singer') {
            return this._getSingerDetail()
          } else if(this.detailTypes === 'rank') {
            return this._getRankDetail()
          } else {
            return this._getAlbumDetail()
          };
        },
        methods: {
        _getSingerDetail() {
            return getSingerDetail(this.detailMid).then((res) => {
              if (res.code === 0) {
                this.img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.detailMid}.jpg?max_age=2592000`;
                return res.data.list
              }
            }).then((res) => {
              this.songs = this.handleList(res);
            })
          },
          _getRankDetail() {
            return getMusicList(this.detailMid).then((res) => {
              if (res.code === 0) {
                this.img = res.topinfo.pic_v12;;
                return res.songlist;
              }
            }).then((res) => {
              this.songs = this.handleList(res);
            })
          },
          _getAlbumDetail() {
            return getAlbumDetail(this.detailMid).then((res) => {
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
              if(this.detailTypes === 'rank') {
                List.push(handleSong(item.data));
              } else if(this.detailTypes === 'singer') {
                List.push(handleSong(item.musicData));
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