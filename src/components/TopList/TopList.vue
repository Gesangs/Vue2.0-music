<template>
  <div class="TopList">
    <span class="fanhui" @click="fanhui"></span>
    <img :src="topurl" alt="" class="topImg">
    <scroll class="toplist" :data="toplist">
          <ul>
            <li v-for="item in toplist" @click="Tplay(item)">
              <img :src="item.img" alt="">
              <div>
                <span>{{ item.music_name }}</span>
                <span>{{ item.singer }}</span>
              </div>
            </li>
          </ul>
        </scroll>
  </div>
</template>
<script>
import Scroll from '../scroll.vue';
import {savePlay} from "../../api/localStorage.js"
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
      created() {
        var timer = setTimeout(() => {
           this.toplist = this.handleList(this.topList);
           this.topurl = this.$store.state.topUrl;
        }, 800);
        timer = null;
      },
      computed: {
        topList() {
          return this.$store.state.topList;
        }
      },
      methods: {
        fanhui() {
          this.$router.go(-1);
        },
        handleImg(img) {
        return "https://y.gtimg.cn/music/photo_new/T002R300x300M000"+ img.albummid +".jpg?max_age=2592000";
      },
      handleMusic(music) {
        return "http://ws.stream.qqmusic.qq.com/"+ music.songid +".m4a?fromtag=46";
      },
      handleSinger(sing) {
        let len = sing.singer.length;
        let name = [];
        if(len) {
          for(let i=0; i < sing.singer.length;i++) {
            name.push(sing.singer[i].name);
          }
          return name.join(" | ");
        }else{
          return sing.singer[0].name;
        }
      },
      strDecode(str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
          return String.fromCharCode(parseInt($2 , $1 ? 16:10));
      });
    },
      handleList(list) {
        const List = [];
        for(let i = 0;i<list.length;i++) {
          let music = {
          img: this.handleImg(list[i].data),
          music:this.handleMusic(list[i].data),
          music_name: this.strDecode(list[i].data.songname),
          singer: this.strDecode(this.handleSinger(list[i].data)),
          id: list[i].data.songid,
          mid: list[i].data.songmid,
          index: i
        };
        List.push(music);
        };
        this.musics = List;
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
  position: absolute;
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
  height: 250px;
}
.toplist {
  height: 100%;
  position: absolute;
  width: 100%;
  top: 250px;
  overflow: hidden;
}
</style>