<template>
  <div class="contorller" :style="{height: playHeight}" @click="Display">
      <div class="img clearfix" :class="{imgPlay: isDisplay}" :style="{background: Img}" >
          <div class="img-top"></div>
          <div class="img-bottom"></div>
      </div>
      <div class="title" :class="{'title-play':isDisplay}">
          <p class="gequ">{{ Music.music_name || '不要说话' }}</p>
          <p class="geshou">{{ Music.singer || '陈奕迅' }}</p>
      </div>
      <p class="geci"></p>
      <div class="contorl" :class="{'control-play':isDisplay}">
          <span class="iconfont icon-loop" v-show="isDisplay"></span>
          <span class="iconfont icon-pre" v-show="isDisplay"></span>
          <span :class="[isPlay ? errorClass : trueClass]" class="iconfont" @click.stop="ready"></span>
          <span class="iconfont icon-next"></span>
          <span class="iconfont icon-xin" v-show="isDisplay"></span>
      </div>
      <audio :src="Music.music || audioUrl" ref="audio" :autoplay="isPlay"></audio>
      <div class="icon-down" v-show="isDisplay" @click.stop="unDisplay"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
          playHeight: '4em',
          isDisplay: false,
          trueClass: 'icon-play',
          errorClass: 'icon-unplay',
          audioUrl:'http://ws.stream.qqmusic.qq.com/9059607.m4a?fromtag=46'
        };
    },
    mounted() {
      // 获取Audio之前要 '钩' 一下
      this.$nextTick(() => {
              this.getAudio();
            })
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
          this.playHeight = '100%',
          console.log(this.$store.state.audio);
        },
        // 收回
        unDisplay() {
          this.playHeight = '4em',
          this.isDisplay = false
        },
        // 点击播放音乐
        ready() {
          if(! this.isPlay) {
            this.$refs.audio.play();
            this.$store.commit('isplay', true);
          } else {
            this.$refs.audio.pause();
            this.$store.commit('isplay', false);
          }
        },
        // 获取audio传入find组件实现点击播放，移动端不支持autoplay
        getAudio() {
          let au = this.$refs.audio;
          this.$store.commit("audioDom", au);
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
    width: 4em;
    height: 4em;
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
    transition: left 0.5s;
    transform: translate3d(0,0,0);
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


.geci {
    display: none;
}

.contorl {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 20px;
    right: 20px;
    transition: top 1s;
    transform: translate3d(0,0,0);
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
  background: url(img/play.svg) no-repeat;
  background-size: cover;
}

.icon-unplay {
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
.icon-down {
  width: 30px;
  height: 30px;
  background: url(img/down.svg) no-repeat;
  background-size: contain;
  margin: 20px 20px 10px 30px;
  position: absolute;
  top: 0;
  z-index: 20;
}


</style>