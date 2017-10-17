<template>
  <transition name="slide">
  <div class="TopList">
    <span class="fanhui" @click="fanhui"></span>
    <img :src="topurl" alt="" class="topImg">
    <scroll class="toplist" :data="toplist">
          <ul>
            <li v-for="item in toplist" @click="Tplay(item)">
              <img v-lazy="item.image" alt="">
              <div>
                <span>{{ item.name }}</span>
                <span>{{ item.singer }}</span>
              </div>
            </li>
          </ul>
        </scroll>
  </div>
  </transition>
</template>
<script>
import Scroll from '../../base/scroll.vue';
import {savePlay} from "../../api/localStorage.js";
import {handleSong} from "../../base/song.js"
    export default {
      components: {
          Scroll
        },
      data() {
        return {
          toplist:[],
          topurl:''
        }
      },
      mounted() {
        this.toplist = this.handleList(this.topList);
        this.topurl = this.topUrl;
         },
      computed: {
        topList() {
          return this.$store.state.topList;
        },
        topUrl() {
          return this.$store.state.topUrl;
        }
      },
      methods: {
        fanhui() {
          this.$router.go(-1);
        },
      handleList(list) {
        const List = [];
        list.forEach((item) => {
          let music = handleSong(item.data)
        List.push(music);
        });
        console.log(List);
        return List;
      },
      Tplay(item) {
          this.$store.commit('playMusic', item);
          savePlay(item);
          this.$store.commit('pushList', this.toplist);
          this.$store.commit('isplay', {isPLaying:true});
          this.$store.commit("addOld",item);
          this.$store.state.audio.play();
      }
      }
    }
</script>

<style>
.TopList {
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
  width: 40px;
  height: 40px;
  background: url(fanhui.svg) no-repeat;
  background-size: cover;
  margin:10px;
}
.topImg {
  width: 100%;
  height: 200px;
}
.toplist {
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
</style>