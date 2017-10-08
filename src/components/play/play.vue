<template>
  <div class="contorller" :style="{height: playHeight}" @click="Display">
      <div class="iconfont icon-down" v-show="isDisplay" @click.stop="unDisplay"></div>
      <div class="img clearfix" :class="{imgPlay: isDisplay}" :style="{background: Img}" >
          <div class="img-back"></div>
      </div>
      <div class="title" :class="{'title-play':isDisplay && !isFullLyric}">
          <p class="gequ">{{ Music.music_name || '轻听'}}</p>
          <p class="geshou">{{ Music.singer}}</p>
      </div>
      <div class="fullGeci" v-show="isFullLyric && isDisplay"  @click="togglefull">
        <scroll class="ly-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">
          <div style="width: 80%;margin: 0 auto;overflow: hidden;">
          <div v-if="currentLyric">
            <p ref="lyricLine" class="text" v-for="(line,index) in currentLyric.lines" :class="{'current': currentLineNum === index}" >{{ line.txt }}</p>
          </div>
        </div>
        </scroll>
      </div>
      <div class="geci" v-show="isDisplay && !isFullLyric" @click="togglefull">
        <p>{{ playingLyric }}</p>
      </div>
      <transition name="normal">
      <div class="contorl" :class="{'control-play':isDisplay}">
          <span class="iconfont icon-loop" :class="[isLoop ? loop : unloop]" @click.stop="setLoop" v-show="isDisplay"></span>
          <span class="iconfont icon-pre" @click.stop="pre" v-show="isDisplay"></span>
          <span :class="[isPlay ? errorClass : trueClass]" class="iconfont" @click.stop="ready"></span>
          <span class="iconfont icon-next"  @click.stop="next"></span>
          <span :class="[Music.isLove ? loveClass : unloveClass]" class="iconfont" @click="Love(Music)" v-show="isDisplay"></span>
      </div>
    </transition>
      <audio :src="Music.music" ref="audio" :autoplay="isPlay" @timeupdate="updateTime" @canplay="getLyric" @ended="next" :loop="isLoop"></audio>
      <div class="progressBar" ref="progressBar">
        <div class="progress" ref="progress"></div>
      </div>
  </div>
</template>
<script>
import Scroll from '../scroll.vue'
import {getLyric} from '../../api/song.js';
import {Base64} from 'js-base64';
import Lyric from 'lyric-parser';
export default {
  components: {
            Scroll
        },
    data() {
        return {
          playHeight: '69px',
          isDisplay: false,
          isFullLyric:false,
          isLoop:false,
          loop: 'icon-loop',
          unloop: 'icon-unloop',
          trueClass: 'icon-play',
          errorClass: 'icon-unplay',
          loveClass: 'icon-hongxin',
          unloveClass: 'icon-xin',
          currentTime: 0,
          currentLyric: null,
          currentLineNum:0,
          playingLyric:''
        };
    },
    mounted() {
      // 获取Audio之前要 '钩' 一下
      this.$nextTick(() => {
              this.getAudio();
            })
    },
    watch: {
      // 进度条
      currentTime(newcurrent) {
        const all = this.$refs.audio.duration;
        const percent = newcurrent / all;
        const barWidth = this.$refs.progressBar.clientWidth;
        if(percent >= 0) {
          const offsetWidth = barWidth * percent
          this.$refs.progress.style.width = `${offsetWidth}px`;
        }
      },
      isLove() {
        return this.$store.state.Music.isLove;
      }
    },
    computed: {
      Music() {
      return this.$store.state.Music;
    },
    Img() {
      if(! this.Music.img) {
        return 'url(../../static/16pic_1792828_b.webp)';
      }else {
        return 'url(' + this.Music.img + ')';
      }
    },
    isPlay() {
      return this.$store.state.isPlaying;
    },
    currentList() {
      return this.$store.state.currentList;
    }
    },
    methods: {
      // 展开
        Display() {
          this.isDisplay = true,
          this.playHeight = '100%';
        },
        togglefull() {
          this.isFullLyric = !(this.isFullLyric);
          this.$nextTick(() => {
             this.$refs.lyricList.refresh()
          })
        },
        // 收回
        unDisplay() {
          this.playHeight = '69px',
          this.isDisplay = false
        },
        // 切换播放状态
        ready() {
          if(! this.isPlay) {
            this.$refs.audio.play();
            this.$store.commit('isplay', true);
          } else {
            this.$refs.audio.pause();
            this.$store.commit('isplay', false);
          }
          if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
        },
        getLyric() {
          getLyric(this.Music.mid).then((res) => {
             if(res.retcode === 0) {
              return Base64.decode(res.lyric)
             }
          }).then((lyric) => {
            if(this.currentLyric) {
              this.currentLyric.stop();
            }
            this.currentLyric = new Lyric(lyric, this.handleLyric);
            this.$nextTick(() => {
              if (this.isPlay) {
                this.currentLyric.play();
              }
            })
          })
        },
        handleLyric({lineNum, txt}) {
          this.currentLineNum = lineNum;
          if (lineNum > 6) {
          let lineEl = this.$refs.lyricLine[lineNum - 6]
          this.$refs.lyricList.scrollToElement(lineEl, 500)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
          this.playingLyric = txt;
        },
        updateTime(e) {
         this.currentTime = e.target.currentTime;
        },
        // 获取audio传入find组件实现点击播放，移动端不支持autoplay
        getAudio() {
          let au = this.$refs.audio;
          this.$store.commit("audioDom", au);
        },
        next() {
          var index = this.Music.index + 1;
          if(index === this.currentList.length) {
            index = 0;
          }
          var currentMusic = [];
          currentMusic.push(this.currentList[index]) ;
          this.$store.commit('playMusic', currentMusic[0]);
          this.$store.commit("addOld",currentMusic[0]);
        },
        pre() {
          var index;
          if(this.Music.index === 0) {
            index = this.currentList.length - 1;
          } else {
            index = this.Music.index - 1;
          }
          var currentMusic = [];
          currentMusic.push(this.currentList[index]) ;
          this.$store.commit('playMusic', currentMusic[0]);
          this.$store.commit("addOld",currentMusic[0]);
        },
        setLoop() {
          this.isLoop = !(this.isLoop);
        },
        Love(item) {
          if(this.Music.isLove) {
            this.$store.commit('setLove',false);
            this.$store.commit('delLove',item);
          }else{
          let music = {
              img: item.img,
              music: item.music,
              music_name: item.music_name,
              singer: item.singer,
              id: item.id,
              mid: item.mid,
              index: this.$store.state.loveMusic.length,
              isLove: true
            };
          this.$store.commit('setLove',true);
          this.$store.commit('addLove',music);
          console.log("loveMusic");
          console.log(this.$store.state.loveMusic)
        }
      }
    }
};
</script>

<style>
.contorller {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
    background-color: rgb(196,176,152);
    box-shadow: 7px 0 7px 0 rgb(196,176,152);
    transform: translate3d(0,0,0);
    transition: all 0.4s;
}

.contorller .img{
    width: 64px;
    height: 64px;
    background-size: cover !important;
    background-position: center center;
    position: relative;
    transform: translate3d(0,1px,0);
    transition: all 0.4s;
}


.img .img-back {
  width: 100%;
  height: 101%;
  background: linear-gradient(rgb(196,176,152), transparent, transparent,transparent,rgb(196,176,152));
}

.imgPlay {
  width: 100% !important;
  height: 55% !important;
}

.title {
    position: absolute;
    top:0px;
    left: 8em;
    transition: left 0.4s ease;
    transform: translate3d(0,0,0);
    z-index: 26;
    font-size: 62.5%;
}


.title .gequ {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
}

.title .geshou {
    font-size: 13px;
    text-align: center;
}


.contorl {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 20px;
    right: 20px;
    transition: top 1s;
    transform: translate3d(0,0,0);
    vertical-align: middle;
    /* 中线对齐 */
    align-items: center;
    z-index: 25;
}

.contorl span + span {
    margin-left: 30px;
}


.title-play {
    top: 62%;
    left:50%;
    transform: translate(-50%);
}

.control-play {
    width: 100%;
    right: 0;
    bottom: 40px;
    display: flex;
    justify-content: center;
    font-size: 30px;
}

.clearfix:after,
.clearfix:before
{
content: " ";
display:table;
}
.clearfix:after
{
clear:both;
}

.iconfont {
  width: 30px;
  height: 30px;
}

.icon-loop {
  background: url(img/loop.svg) no-repeat;
  background-size: cover;
  width: 28px;
  height: 28px;
  margin: 1px 0;
}
.icon-unloop {
  background: url(img/lbloop.svg) no-repeat;
  background-size: cover;
  width: 28px;
  height: 28px;
  margin: 1px 0;
}
.icon-pre {
  background: url(img/pre.svg) no-repeat;
  background-size: cover;
}
.icon-play {
  width: 35px;
  height: 35px;
  background: url(img/play.svg) no-repeat;
  background-size: cover;
}

.icon-unplay {
  width: 35px;
  height: 35px;
  background: url(img/unplay.svg) no-repeat;
  background-size: cover;
}
.icon-next {
  background: url(img/next.svg) no-repeat;
  background-size: cover;
}
.icon-xin {
  background: url(img/xin.svg) no-repeat;
  background-size: cover;
  width: 24px;
  height: 24px;
  margin: 1px 0;
}
.icon-hongxin {
  background: url(img/hongxin.svg) no-repeat;
  background-size: cover;
  width: 24px;
  height: 24px;
  margin: 1px 0;
}
.icon-down {
  background: url(img/down.svg) no-repeat;
  background-size: contain;
  margin: 20px 20px 10px 30px;
  position: absolute;
  top: 0;
  z-index: 26;
}
.current {
  color: #fff;
}
.progressBar {
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  bottom: 0px;
  background-color: rgb(0,0,0);
  z-index: 25;
}
.progress {
  width: 0;
  height: 5px;
  background-color: #fff;
  z-index: 25;
}

.geci {
  width: 100%;
  position: absolute;
  height: 50px;
  bottom: 15%;
  line-height: 20px;
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
}
.geci p {
  text-align: center;
  font-size: 13px;
}

.fullGeci {
  width: 100%;
  height: 100%;
  background-color: rgba(196,176,152,0.9);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 25;
  line-height: 35px;
}
.fullGeci p {
  text-align: center;
  font-size: 13px;
}

.ly-wrapper {
  margin: 95px 0 20px 0;
  /*position: absolute;*/
  left: 0;
  right: 0;
  height: 66%;
  overflow: hidden;
}
</style>