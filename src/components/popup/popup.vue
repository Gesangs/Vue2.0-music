<template>
  <transition name="upSlide">
    <div class="popup" @click.stop.prevent="downpopup">
        <div class="musicDetail">
            <p>歌曲：<span v-html="musicDetail.name"></span></p>
              <ul>
                  <li>下一首播放</li>
                  <li @click.stop="setlove">添加到我喜欢</li>
                  <li @click.stop="searchSingerAndAlbum(musicDetail.singer.mid,'singer')">歌手：<span v-html="musicDetail.singer.name"></span></li>
                  <li @click.stop="searchSingerAndAlbum(musicDetail.album.mid,'album')">专辑：<span v-html="musicDetail.album.name"></span></li>
                  <li>来源: {{  }}</li>
              </ul>
        </div>
    </div>
  </transition>
</template>
<script>
    export default {
      props: {
        musicDetail: {
          type: Object,
          default:{}
        },
        isShow: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        searchSingerAndAlbum(id,type) {
        this.$store.commit('setDetailTypes',type)
        this.$store.commit("setDetailMid", id);
        this.$router.push({
              path:`/detail`
            });
    },
    downpopup() {
      this.$emit('caidan')
      },
    setlove() {
      this.$emit('Love')
    }
    }
    }
</script>
<style>
    .popup {
      position: fixed;
      width: 100%;
      bottom: 5px;
      top: 0;
      left: 0;
      overflow: hidden;
      z-index: 30;
      background: rgba(7, 17, 27, 0.8);
    }

    .musicDetail {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 45%;
      z-index: 31;
      background-color: #fff;
    }
    .musicDetail > p {
      font-size: 12px;
      padding: 8px 10px;
    }
    .musicDetail > ul > li {
      height: 40px;
      padding: 2px 10px;
      line-height: 40px;
      border-bottom: 1px solid rgba(1,186,144,0.3);
    }

    .upSlide-enter-active, .upSlide-leave-active {
  transition: all 0.6s;
}
.upSlide-enter, .upSlide-leave-to {
  opacity: 0;
}
</style>