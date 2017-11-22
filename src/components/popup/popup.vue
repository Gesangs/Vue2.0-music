<!-- 歌曲详情 -->
<template>
  <transition name="fade">
    <div class="popup" @click.stop.prevent="downpopup">
        <div class="musicDetail" @click.stop="">
            <p><span>歌曲：</span><span v-html="selectMusic.name"></span></p>
              <ul>
                  <li @click="insertNext(selectMusic)">下一首播放</li>
                  <li @click="love(selectMusic)">{{ islove ? '已添加至喜欢' : '添加至喜欢' }}</li>
                  <li @click="searchSinger(selectMusic.singer.mid)"><span>歌手：</span><span v-html="selectMusic.singer.name"></span></li>
                  <li @click="searchAlbum(selectMusic.album.mid)"><span>专辑：</span><span v-html="selectMusic.album.name"></span></li>
                  <li @click="deletes(selectMusic)" v-show="isold || islove">删除</li>
              </ul>
        </div>
    <!-- <router-view></router-view> -->
    </div>
  </transition>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'selectMusic',
      'oldMusic'
      ])
  },
  data() {
    return {
      islove: false,
      isold: false
    }
  },
  created() {
    this.isLove(this.selectMusic.id).then((res) => {
      this.islove = res;
    })
    this.isOld(this.selectMusic.id)
  },
  methods: {
    ...mapMutations([
      'setDetailTypes',
      'setDetailMid',
      'setpopupShow',
      'delOld',
      'delLove'
      ]),
    ...mapActions([
      'isLove',
      'Love',
      'insertNext'
      ]),
searchSinger(id) {
  this.setDetailMid(id);
  this.setpopupShow(false);
  this.$router.push({
        path:`/singerDetail`
      });
},
searchAlbum(id) {
  this.setpopupShow(false);
  this.setDetailMid(id);
  this.$router.push({
        path:`/albumDetail`
      });
},
downpopup() {
  this.setpopupShow(false);
  },
  love(music) {
    this.Love(music);
    if(this.islove) {
      this.islove = false;
      this.setpopupShow(false);
    } else {
      this.islove = true;
    }
  },
  isOld(musicId) {
      let index = this.oldMusic.findIndex((item) => {
        return item.id == musicId;
      })
      this.isold = (index > -1);
  },
  deletes(item) {
     if(this.isold) {
       this.delOld(item);
     } else {
       this.delLove(item);
     }
     this.setpopupShow(false)
   }
 }
}
</script>
<style scopeId>
    .popup {
      color: #000;
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      bottom: 5px;
      z-index: 33;
      background-color: rgba(7,17,27,0.7);
    }
    .musicDetail {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 45%;
      background-color: #fff;
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