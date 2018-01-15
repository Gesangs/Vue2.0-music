<template>
  <div class="contorller"
       :style="{height:playHeight, backgroundColor:setColor, color:fontColor}"
       @click="Display"
       ref="contor">
    <div class="iconfont icon-down" v-show="isDisplay" @click.stop="unDisplay"></div>
    <div class="iconfont icon-menu" v-show="isDisplay" @click.stop="caidan"></div>
    <div class="img clearfix"
         :class="{imgPlay: isDisplay}"
         :style="{background: Image}">
      <div class="img-back"
           :style="{background:`linear-gradient(${isDisplay ? setColor : 'to right'} ,transparent ,${setColor})`}"
           @touchstart.prevent="touchStart"
           @touchmove.prevent="touchMove"
           @touchend.prevent="touchEnd"></div>
    </div>
    <div class="title" :class="{'title-play':isDisplay && !isFullLyric}">
      <p class="gequ" v-html="Music.name || '轻听'"></p>
      <p class="geshou" v-html="singerName"></p>
    </div>
    <!-- 歌词区块 -->
    <transition name="fade">
    <div class="fullGeci" :style="{backgroundColor: setColorf, color: setColorg}" v-show="isFullLyric && isDisplay"  @click="togglefull">
      <scroll class="ly-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">
        <div style="width: 80%;margin: 0 auto;overflow: hidden;">
          <div v-if="currentLyric">
            <p ref="lyricLine" 
               v-for="(line, index) in currentLyric.lines"
               :key='index' 
               :class="{[Current] : currentLineNum === index}" 
               @click.stop="ToLyric(line.time, index)">{{ line.txt }}</p>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
    <div class="geci" v-show="isDisplay && !isFullLyric" @click="togglefull">
      <p>{{ playingLyric }}</p>
    </div>
    <!-- 播放控制区块 -->
      <div class="contorl" :class="{'control-play':isDisplay}">
        <span class="iconfont"
        :class="[modeIndex === 0 ? Mode[modeIndex] : modeIndex === 1 ? Mode[modeIndex] : Mode[modeIndex]]"
        @click.stop="setLoop" v-show="isDisplay"></span>
        <span class="iconfont icon-pre" @click.stop="pre" v-show="isDisplay"></span>
        <span :class="[isPlaying ? unplayClass : playClass]" class="iconfont" @click.stop="ready"></span>
        <span class="iconfont icon-next"  @click.stop="next"  v-show="isDisplay"></span>
        <span :class="[islove ? loveClass : unloveClass]" class="iconfont" @click="Love(Music)" v-show="isDisplay"></span>
        <span class="iconfont icon-list"  @click.stop="showlist" v-show="!isDisplay"></span>
      </div>
    <audio :src="Music.url" ref="audio" :autoplay="isPlaying" @timeupdate="updateTime" @ended="next" @loadedmetadata="getLyric" :loop="modeIndex === 0" @error="Error"></audio>
    <!--  -->
    <div class="progressBar" ref="progressBar">
      <div class="progress" ref="progress"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Scroll from "../../base/scroll.vue";
import popup from "../popup/popup.vue";
import { getLyric } from "../../api/song.js";
import { getMusicVkey } from "../../api/search";
import { Base64 } from "js-base64";
import Lyric from "lyric-parser";
import "../../base/rgbaster.min.js";

const Width = window.innerWidth;
const Height = window.innerHeight;

export default {
  components: {
    Scroll,
    popup
  },
  data() {
    return {
      playHeight: "59px",
      isFullLyric: false,
      islove: false,
      setColorf: `rgba(196,176,152,0.9)`,
      setColor: "rgb(196,176,152)",
      fontColor: "#000",
      setColorg: "#000",
      Mode: ["icon-loop", "icon-randoms", "icon-unloop"],
      modeIndex: 2,
      playClass: "icon-play",
      unplayClass: "icon-unplay",
      loveClass: "icon-hongxin",
      unloveClass: "icon-aixin",
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      playingLyric: "",
      Current: "currentw"
    };
  },
  mounted() {
    // 获取Audio之前要 '钩' 一下
    this.$nextTick(() => {
      this.getAudio();
    });
  },
  watch: {
    // 进度条
    currentTime(newcurrent) {
      const all = this.$refs.audio.duration;
      const percent = newcurrent / all;
      const barWidth = this.$refs.progressBar.clientWidth;
      if (percent >= 0) {
        const offsetWidth = barWidth * percent;
        this.$refs.progress.style.width = `${offsetWidth}px`;
      }
    }
  },
  computed: {
    ...mapGetters([
      "Music",
      "isPlaying",
      "isDisplay",
      "loveMusic",
      "currentList",
      "Image"
    ]),
    singerName() {
      this.islove = false;
      this.isLove(this.Music.id).then(res => {
        this.islove = res;
      });
      return this.Music.singer.name;
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    ...mapMutations([
      "setdialogMsg",
      "delOld",
      "setDisplay",
      "isplay",
      "audioDom",
      "playMusic",
      "addOld",
      "selectmusic"
    ]),
    ...mapActions(["Love", "isLove", "diaShow", "clickPlay"]),
    showlist() {
      if (!this.Music.url) {
        return;
      }
      this.$emit("showLists");
    },
    // 获取图片主题色
    getImageColor() {
      const that = this;
      const host = location.host;
      // canvas不允许跨域资源调用方法，利用后台转发的方法，解决跨域问题。
      const URl = `http://${host}/api/img?0=${this.Music.image}`;
      // 把图片绘入canvas利用getImageData获取主题色
      RGBaster.colors(URl, {
        // 调色板大小
        paletteSize: 30,
        // 颜色排除
        exclude: ["rgb(255,255,255)", "rgb(0,0,0)"],
        success: function(payload) {
          // 设置背景色
          that.setColor = payload.dominant;
          // 提取颜色R、G、B值
          let c = payload.dominant.match(/\d+/g);
          that.setColorf = `rgba(${c[0]},${c[1]},${c[2]},0.9)`;
          // 转换成灰度值判断颜色深浅
          let grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
          if (grayLevel >= 192) {
            // 若为浅色，把文字设置为黑色
            that.fontColor = "#000";
            // 歌词颜色
            that.setColorg = "rgb(99,118,117)";
            // 歌词高亮为白色
            that.Current = "currentb";
          } else {
            that.fontColor = "#fff";
            that.setColorg = "rgb(219, 182, 182)";
            that.Current = "currentw";
          }
        }
      });
    },
    // 音乐无法加载时触发
    Error() {
      if (!this.Music.url) {
        return;
      }
      this.setdialogMsg("无法播放，已跳过");
      this.diaShow();
      this.$nextTick(() => {
        this.delOld(this.Music);
        this.next();
      });
    },
    // 右上角菜单键
    caidan() {
      if (!this.Music.url) {
        return;
      }
      this.selectmusic(this.Music);
    },
    // 展开
    Display() {
      this.setDisplay(true);
      this.playHeight = "100%";
    },
    // 歌词页面大小切换
    togglefull() {
      if (!this.Music.url) {
        return;
      }
      this.isFullLyric = !this.isFullLyric;
      this.$nextTick(() => {
        this.$refs.lyricList.refresh();
        if (this.currentLineNum > 5) {
          let lineEl = this.$refs.lyricLine[this.currentLineNum - 5];
          this.$refs.lyricList.scrollToElement(lineEl, 600);
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000);
        }
      });
    },
    // 收回
    unDisplay() {
      (this.playHeight = "59px"), this.$store.commit("setDisplay", false);
      this.setDisplay(false);
    },
    // 切换播放状态
    ready() {
      if (!this.Music.url) {
        return;
      }
      if (!this.isPlaying) {
        this.$refs.audio.play();
        this.isplay(true);
      } else {
        this.$refs.audio.pause();
        this.isplay(false);
      }
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    // 获取歌词
    getLyric() {
      if (!this.Music.mid) {
        return;
      }
      this.getImageColor();
      getLyric(this.Music.mid)
        .then(res => {
          if (res.retcode === 0) {
            return Base64.decode(res.lyric);
          }
        })
        .then(lyric => {
          if (this.currentLyric) {
            this.currentLyric.stop();
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric);
          this.$nextTick(() => {
            if (this.isPlaying) {
              this.currentLyric.play();
            }
          });
        });
    },
    // 处理歌词
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (this.currentLineNum > 6) {
        let lineEl = this.$refs.lyricLine[this.currentLineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 600);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    // 点击歌词跳转到指定位置播放
    ToLyric(time, index) {
      this.$refs.audio.currentTime = time / 1000;
      this.currentLyric.seek(time);
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    // 获取audio传入find组件实现点击播放，移动端不支持autoplay
    getAudio() {
      const au = this.$refs.audio;
      this.audioDom(au);
    },
    // 滑动切歌
    touchStart(e) {
      this.touch.initiated = true;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    touchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      this.touch.deltaX = touch.pageX - this.touch.startX;
      this.touch.deltaY = touch.pageY - this.touch.startY;
    },
    touchEnd(e) {
      if (this.touch.deltaX > 0 && Math.abs(this.touch.deltaX) > 70) {
        this.touch.deltaX = 0;
        this.pre();
      }
      if (this.touch.deltaX < 0 && Math.abs(this.touch.deltaX) > 70) {
        this.touch.deltaX = 0;
        this.next();
      }
      if (this.touch.deltaY > 0 && Math.abs(this.touch.deltaY) > 70) {
        this.touch.deltaY = 0;
        this.unDisplay();
      } else {
        return;
      }
      this.touch.initiated = false;
    },
    // 下一首
    next() {
      if (!this.Music.url) {
        return;
      }
      const len = this.currentList.length;
      let index = this.Music.index + 1;
      if (index === len) {
        index = 0;
      }
      if (this.modeIndex === 1) {
        index = Math.floor(Math.random() * len);
      }
      this.clickPlay({item: this.currentList[index]});
    },
    // 上一首
    pre() {
      if (!this.Music.url) {
        return;
      }
      let index;
      const len = this.currentList.length;
      if (this.Music.index === 0) {
        index = len - 1;
      } else {
        index = this.Music.index - 1;
      }
      this.clickPlay({item: this.currentList[index]});
    },
    // 循环
    setLoop() {
      if (!this.Music.url) {
        return;
      }
      this.modeIndex++;
      if (this.modeIndex === 3) {
        this.modeIndex = 0;
      }
      if (this.modeIndex === 0) {
        this.setdialogMsg("单曲循环");
      } else if (this.modeIndex === 1) {
        this.setdialogMsg("随机播放");
      } else {
        this.setdialogMsg("列表循环");
      }
      this.diaShow();
    }
  }
};
</script>
  <style scoped>
@import "./font_play/iconfont.css";
.contorller {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 20;
  box-shadow: 3px 0px 4px 0 rgba(167, 135, 135, 0.7);
  /*启用GPU加速*/
  transform: translate3d(0, 0, 1px);
  transition: all 0.4s cubic-bezier(0.15, 0.65, 0.35, 0.97);
}
.icon-menu {
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
  z-index: 26;
}
.icon-down {
  position: absolute;
  top: 0;
  left: 0;
  margin: 15px;
  z-index: 26;
}
.contorller .img {
  width: 54px;
  height: 54px;
  background-size: cover !important;
  background-position: center center;
  position: relative;
  transform: translate3d(0, 1px, 0);
  transition: all 0.4s cubic-bezier(0.15, 0.65, 0.35, 0.97);
}
.img .img-back {
  width: 101%;
  height: 101%;
}
.imgPlay {
  width: 100% !important;
  height: 55% !important;
  transform-origin: top left !important;
}
.title {
  position: absolute;
  top: 0px;
  left: 7em;
  transition: left 0.4s ease;
  transform: translate3d(0, 0, 0);
  z-index: 26;
  font-size: 62.5%;
}
.title .gequ {
  font-size: 0.75rem;
  line-height: 30px;
  text-align: center;
}
.title .geshou {
  font-size: 0.75rem;
  text-align: center;
}
.contorl {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 10px;
  right: 20px;
  transition: all 0.4s;
  transform: translate3d(0, 0, 0);
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
  left: 50%;
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
.clearfix:before {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
.currentw {
  color: #fff;
}
.currentb {
  color: #000;
}
.progressBar {
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  bottom: 0px;
  background-color: rgb(0, 0, 0);
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
  padding: 50px 10px;
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
  margin: 95px 10px 20px 10px;
  left: 0;
  right: 0;
  height: 56%;
  overflow: hidden;
}
</style>
