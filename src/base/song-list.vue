<template>
    <div class="song-list">
        <ul>
            <li v-for="(item, index) in songs" @click="Splay(item, index)">
              <img v-lazy="item.image" alt="">
              <div>
                <span v-html="item.name"></span>
                <span v-html="item.singer.name"></span>
              </div>
              <p v-if="delShow" class="iconfont icon-del_1" @click.stop="deletes(item)"></p>
            </li><li></li>
        </ul>
    </div>
</template>

<script>
import {savePlay} from '../api/localStorage.js';
import popup from '../components/popup/popup.vue';
import axios from 'axios'

    export default {
      components: {
        popup
      },
        props: {
            songs: {
                type: Array,
                default: []
            },
            types: {
              type: String,
              default: 'normal'
            }
        },
        data() {
          return {
            isShow: false,
            delShow: false
          }
        },
        created() {
           this.delShow = false;
          if(this.types == 'old' || this.types == 'love') {
            this.delShow = true;
          }
        },
        computed: {
          loveList() {
                return this.$store.state.loveMusic;
            }
        },
        methods: {
            caidan(item) {
              this.isShow = !this.isShow;
            },
            // 点击播放
            Splay(item,index) {
              const music = Object.assign({},item,{index:index});
              this.$store.commit('playMusic', music);
              // 把所在列表所有歌曲存起来，以便控制上一首下一首
              this.$store.commit('pushList', this.songs);
              // 设置播放状态
              this.$store.commit('isplay', {isPLaying:true});
              // 添加到最近播放
              this.$store.commit("addOld",music);
              this.$store.state.audio.play();
            },
            deletes(item) {
              if(this.types === 'old') {
                this.$store.commit('delOld',item);
              } else {
                this.$store.commit('delLove',item);
              }
            }
        }
    }
</script>

<style>
li {
    width:100%;
    height: 60px;
    display: flex;
}
.song-list li > img {
    flex: 0 0 35px;
    width: 35px;
    height: 35px;
    margin: 15px;
}
.song-list li >div {
    flex: 1;
    height: 64px;
    border-bottom: 1px solid rgba(1,186,144,0.3);
}
.song-list li > div > span:nth-child(1) {
    display: block;
    margin-top: 12px;
    font-size: 12px;
    color: rgb(1,186,144);
}
.song-list li > div > span:nth-child(2) {
    display: block;
    margin-top: 5px;
    font-size: 11px;
}
.song-list li > span {
    display: block;
    float: right;
}
.song-list .icon-del_1 {
  margin-top: 18px;
  opacity: 0.4;
}

</style>