<!-- 歌曲详情 -->
<template>
  <transition name="fade">
    <div class="popup" @click.stop.prevent="downpopup" ref="pop">
        <div class="musicDetail">
            <p><span>歌曲：</span><span v-html="musicDetail.name"></span></p>
              <ul>
                  <li>下一首播放</li>
                  <li @click.stop="setlove">添加到我喜欢</li>
                  <li @click.stop="searchSingerAndAlbum(musicDetail.singer.mid,'singer')"><span>歌手：</span><span v-html="musicDetail.singer.name"></span></li>
                  <li @click.stop="searchSingerAndAlbum(musicDetail.album.mid,'album')"><span>专辑：</span><span v-html="musicDetail.album.name"></span></li>
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
      created() {
      },
      methods: {
        // 跳转详情页
        searchSingerAndAlbum(id,type) {
        this.$store.commit('setDetailTypes',type)
        this.$store.commit("setDetailMid", id);
        this.$router.push({
              path:`/detail`
            });
    },
    // 通知父组件关闭详情页
    downpopup() {
      this.$emit('caidan')
      },
    // 通知父组件把这首歌添加到我喜欢
    setlove() {
      this.$emit('Love')
    }
  }
}
</script>
<style>
    .popup {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      bottom: 5px;
    }
    .musicDetail {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      width: 70%;
      height: 267px;
      z-index: 40;
      background-color: rgb(243,243,243);
      box-shadow: 0px 8px 10px 1px rgba(0,0,0,0.14);
      border-radius: 8px;
    }
    .musicDetail > p {
      font-size: 12px;
      padding: 8px 10px;
    }
    .musicDetail > ul > li {
      height: 40px;
      width: 95%;
      margin: 2px 10px;
      font-size: 14px;
      line-height: 40px;
      border-bottom: 1px solid rgba(1,186,144,0.3);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
</style>