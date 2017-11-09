<template>
    <div class="song-list">
        <ul>
            <li v-for="(item, index) in songs" @click="Splay(item, index)">
              <img v-lazy="item.image" alt="">
              <div>
                <span v-html="item.name"></span>
                <span v-html="item.singer.name"></span>
              </div>
              <p class="iconfont icon-Menu" @click.stop="caidan(item)"></p>
            </li><li></li>
        </ul>
        <!-- <popup v-if="isShow" :musicDetail="currentItem" :isShow="isShow" @caidan="caidan" @Love="Love(currentItem)"></popup> -->
    </div>
</template>

<script>
import {savePlay} from '../api/localStorage.js';
import popup from '../components/popup/popup.vue';

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
            currentitem: {}
          }
        },
        computed: {
          loveList() {
                return this.$store.state.loveMusic;
            },
          currentItem() {
            return this.currentitem;
          }
        },
        methods: {
            caidan(item) {
              this.currentitem = item;
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
            isLove(music) {
                var index = this.loveList.findIndex((item) => {
                  return item.id === music.id;
                })
                return index > -1;
            },
            Love(item) {
              if(this.isLove(item)) {
                this.$store.commit('delLove',item);
                this.$store.commit('setdialogMsg','已取消');
              }else{
                this.$store.commit('addLove',item);
                this.$store.commit('setdialogMsg','已添加');
              }
              this.$emit('diaShow');
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
.icon-Menu {
  background: url(../components/play/img/menu.svg) no-repeat;
  background-size: cover;
  position: relative;
  right: 30px;
  top: 25px;
}
</style>