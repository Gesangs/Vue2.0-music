<template>
  <transition name="slide">
  <div class="musicList">
    <div class="listTitle">
      <span class="fanhui" @click="fanhui"></span>
      <span>{{ listTitle }}</span>
    </div>
    <div class="musicImg" :style="{background: Img}"></div>
    <div class="bglayer" ref="bglayer"></div>
    <scroll class="musiclist" :data="musicList">
        <song-list :songs="musicList"></song-list>
        <div v-show="!musicList.length" class="loading-container">
          <loading></loading>
        </div>
    </scroll>
  </div>
  </transition>
</template>
<script>
import SongList from '../song-list.vue';
import Scroll from '../scroll.vue';
import Loading from '../loading.vue';
import {handleSong} from '../song.js';
    export default {
      components: {
          SongList,
          Scroll,
          Loading
        },
        computed: {
          Img() {
            return `url(${this.musicImg}) no-repeat`;
          }
        },
      props: {
        musicList: {
          type: Array,
          default: []
          },
        musicImg: {
          type: String,
          default: ''
          },
        listTitle: {
          type: String,
          default: ''
        }
        },
      methods: {
        fanhui() {
          this.$router.back();
        },
      }
    }
</script>

<style>
.musicList {
  position: fixed;
  width: 100%;
  bottom: 70px;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 19;
  background: rgba(255,255,255,1);
}

.fanhui {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  background: url(fanhui.svg) no-repeat;
  background-size: cover;
  margin: 10px 0 0 10px;
}
.musicImg {
  width: 100%;
  height: 250px;
  padding-top: -50px;
  background-position: center!important;
  background-size: cover!important;
}
.bglayer {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.musiclist {
  height: 100%;
  position: absolute;
  width: 100%;
  top: 250px;
  overflow: hidden;
  background-color: #fff;
}
/*.listTitle {
  display: flex;
  width: 100%;
  height: 70px;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
}*/
.slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
}

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }


  .loading-container {
    position: absolute;
    width: 100%;
    transform: translateY(-50%);
  }
</style>