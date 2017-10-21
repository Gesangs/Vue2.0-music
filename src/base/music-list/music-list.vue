<template>
  <transition name="slide">
  <div class="musicList">
    <span class="fanhui" @click="fanhui"></span>
    <img :src="musicImg" alt="" class="musicImg">
    <div class="bglayer" ref="bglayer"></div>
    <scroll class="musiclist" :data="musicList">
        <song-list :songs="handleList(musicList)"></song-list>
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
      props: {
        musicList: {
          type: Array,
          default: []
          },
        musicImg: {
          type: String,
          default: ''
          }
        },
      methods: {
        fanhui() {
          this.$router.back();
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
  margin:10px;
}
.musicImg {
  width: 100%;
  height: 200px;
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
  top: 200px;
  overflow: hidden;
}

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