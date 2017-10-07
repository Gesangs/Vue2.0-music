<template>
  <div class="contorller" :style="{height: playHeight}" @click="Display">
      <div class="iconfont icon-down" v-show="isDisplay" @click.stop="unDisplay"></div>
      <div class="img clearfix" :class="{imgPlay: isDisplay}" :style="{background: Img}" >
          <div class="img-top"></div>
          <div class="img-bottom"></div>
      </div>
      <div class="title" :class="{'title-play':isDisplay && !isFullLyric}">
          <p class="gequ">{{ Music.music_name || '不要说话' }}</p>
          <p class="geshou">{{ Music.singer || '陈奕迅'  }}</p>
      </div>
      <div class="fullGeci" ref="geci" v-show="isFullLyric && isDisplay"  @click="togglefull">
        <div class="ly-wrapper"  ref="lyricList" :data="currentLyric && currentLyric.lines">
          <div v-if="currentLyric">
            <p ref="lyricLine" class="text" v-for="(line,index) in currentLyric.lines" :class="{'current': currentLineNum === index}" >{{ line.txt }}</p>
          </div>
        </div>
      </div>
      <div class="geci" v-show="isDisplay" @click="togglefull">
        <p>{{ playingLyric }}</p>
      </div>
      <transition name="normal">
      <div class="contorl" :class="{'control-play':isDisplay}">
          <span class="iconfont icon-loop" @click.stop="isLoop" v-show="isDisplay"></span>
          <span class="iconfont icon-pre" @click.stop="pre" v-show="isDisplay"></span>
          <span :class="[isPlay ? errorClass : trueClass]" class="iconfont" @click.stop="ready"></span>
          <span class="iconfont icon-next"  @click.stop="next"></span>
          <span :class="[Music.isLove ? loveClass : unloveClass]" class="iconfont" @click="Love(Music)" v-show="isDisplay"></span>
      </div>
    </transition>
      <audio :src="Music.music || audioUrl" ref="audio" :autoplay="isPlay" @timeupdate="updateTime" @progress="getLyric"></audio>
      <div class="progressBar" ref="progressBar">
        <div class="progress" ref="progress"></div>
      </div>
  </div>
</template>
<!--  @play="readyLyric" -->
<script>
import BScroll from 'better-scroll';
import {getLyric} from '../../api/song.js';
import {Base64} from 'js-base64';
import Lyric from 'lyric-parser';
export default {
    data() {
        return {
          playHeight: '69px',
          isDisplay: false,
          isFullLyric:false,
          trueClass: 'icon-play',
          errorClass: 'icon-unplay',
          loveClass: 'icon-hongxin',
          unloveClass: 'icon-xin',
          currentTime: 0,
          currentLyric: null,
          currentLineNum:0,
          playingLyric:'',
          audioUrl:'http://ws.stream.qqmusic.qq.com/9059607.m4a?fromtag=46'
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
      }
    },
    computed: {
      Music() {
      return this.$store.state.Music;
    },
    Img() {
      if(! this.Music.img) {
        return 'url(http://imgcache.qq.com/music/photo/album_300/82/300_albumpic_35182_0.jpg)';
      }else {
        return 'url(' + this.Music.img + ')';
      }
    },
    isPlay() {
      return this.$store.state.isPlaying;
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
            this._initLyricScroll()
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
              console.log("stop");
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
          if (lineNum > 7) {
          let lineEl = this.$refs.lyricLine[lineNum - 7]
          this.lyricScorll.scrollToElement(lineEl, 500)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
          this.playingLyric = txt;
        },
        _initLyricScroll() {
        this.lyricScorll = new BScroll(this.$refs.lyricList, {
          click: true,
          HWCompositing: true,
          preventDefault: false
        });
      },
        updateTime(e) {
         this.currentTime = e.target.currentTime;
        },
        // 获取audio传入find组件实现点击播放，移动端不支持autoplay
        getAudio() {
          let au = this.$refs.audio;
          this.$store.commit("audioDom", au);
        },
        Love(item) {
          let music = {
              img: item.img,
              music: item.music,
              music_name: item.music_name,
              singer: item.singer,
              id: item.id,
              mid: item.mid
            };
          this.$store.commit('addLove',music);
          console.log(this.$store.state.loveMusic);
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
    background-color: rgb(1,186,144);
    box-shadow: 7px 0 7px 0 rgb(1,186,144);
    transition: height 0.4s;
    transform: translate3d(0,0,0);
}

.contorller .img{
    width: 64px;
    height: 64px;
    background-size: cover !important;
    position: relative;
    transition: height 0.3s;
    transition: width 0.3s;
    transform: translate3d(0,0,0);
}

.img .img-top{
    width: 100%;
    height: 30%;
    background: linear-gradient(rgb(1,186,144), transparent);
}

.img .img-bottom {
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: -1px;
    background: linear-gradient(transparent, rgb(1,186,144));
}

.imgPlay {
  width: 100% !important;
  height: 55% !important;
}

.title {
    position: absolute;
    top:0;
    left: 4.8em;
    transition: all 0.5s;
    transform: translate3d(0,0,0);
    z-index: 26;
}


.title .gequ {
    font-weight: bold;
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
    /*transition: top 1s;
    transform: translate3d(0,0,0);*/
    vertical-align: middle;
    /* 中线对齐 */
    align-items: center;
    z-index: 25;
}

.contorl span + span {
    margin-left: 30px;
}


.title-play {
    top: 65%;
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
  background-color: rgba(1,186,144,0.9);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 25;
  line-height: 25px;
}
.fullGeci p {
  text-align: center;
  font-size: 13px;
}

.ly-wrapper {
  margin: 95px 0 20px 0;
  position: absolute;
  left: 0;
  right: 0;
  height: 66%;
  overflow: hidden;
}
</style>