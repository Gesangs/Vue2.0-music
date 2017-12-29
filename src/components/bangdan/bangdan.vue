<template>
    <transition name="slideB">
    <div class="rank">
        <scroll :data="topList" class="rankscorll" ref="ranklist">
            <div>
            <div v-for="(item, index) in topList" :key='index'>
                <div @click="selectItem(item.id)" class="rankList" >
                <img :src="item.picUrl" alt="">
                <div class="rankRight">
                    <p class="song" v-for="(song,index) in item.songList" :key='index'>
                        <span>{{index + 1}}.{{song.songname}}-{{song.singername}}</span>
                    </p>
                </div>
            </div>
            </div>
        </div>
        <router-view></router-view>
    </scroll>
    </div>
</transition>
</template>

<script>
import { mapMutations } from "vuex";
import { getTopList } from "../../api/rank.js";
import Scroll from "../../base/scroll.vue";
export default {
  components: {
    Scroll
  },
  data() {
    return {
      topList: []
    };
  },
  created() {
    this._getRank();
  },
  methods: {
    ...mapMutations(["setDetailMid"]),
    _getRank() {
      getTopList().then(res => {
        if (res.code === 0) {
          this.topList = res.data.topList;
        }
      });
    },
    selectItem(id) {
      this.setDetailMid(id);
      this.$router.push({
        path: `/rankDetail`
      });
    }
  }
};
</script>

<style>
.rank {
  position: absolute;
  width: 100%;
  top: 72px;
  bottom: 3.8em;
  overflow: hidden;
  background-color: #fff;
}

.rankList {
  display: flex;
  margin: 30px;
}

.rankscorll {
  height: 100%;
  bottom: 60px;
  overflow: hidden;
}

.rankList img {
  height: 90px;
  flex: 0 0 90px;
  width: 90px;
}

.rankRight {
  flex: 1;
  padding: 0 20px;
  line-height: 30px;
  font-size: 13px;
}

.rankRight > p,
.rankRight > span {
  width: 100%;
  /*文本超出宽度的时候省略号*/
  /*white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;*/
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>