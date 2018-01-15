<template>
  <transition name="fade">
    <div class="currentListbag" v-show="showFlag" @click="hide">
      <div class="currentList-warrp" @click.stop="">
      <div class="listBar"></div>
        <scroll :data="currentList" class="currentList" ref="currentList">
            <ul>
              <li v-for="(item, index) in currentList"
                  :key='index'
                  @click="clickPlay({item:item,index:index})"
                  :class="{liSelect: item.id === Music.id}"
                  ref="currentlist">
                <p>{{ index+1 }} .  <span v-html="item.name"></span> - <span v-html="item.singer.name"></span></p>
              </li>
            </ul>
        </scroll>
        <p  @click="hide" class="hideBar">关  闭</p>
      </div>
  </div>
</transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import SongList from "../../base/song-list.vue";
import Scroll from "../../base/scroll.vue";
export default {
  data() {
    return {
      showFlag: false
    };
  },
  components: {
    SongList,
    Scroll
  },
  computed: {
    ...mapGetters(["currentList", "Music"])
  },
  methods: {
    ...mapActions(["clickPlay"]),
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.currentList.refresh();
        const index = this.Music.index;
        if (index > 2) {
          let lineEl = this.$refs.currentlist[index - 2];
          this.$refs.currentList.scrollToElement(lineEl, 300);
        } else {
          this.$refs.currentList.scrollTo(0, 0, 1000);
        }
      }, 100);
    },
    ToCurrentSong() {},
    hide() {
      this.showFlag = false;
    }
  }
};
</script>

<style scoped>
.currentListbag {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 5px;
  background: rgba(7, 17, 27, 0.7);
  z-index: 30;
}
.currentList-warrp {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgb(235, 237, 239);
}
.listBar {
  width: 100%;
  height: 40px;
}
.currentList {
  width: 100%;
  max-height: 240px;
  overflow: hidden;
}
.currentList > ul > li {
  border-left: 5px solid transparent;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  padding-left: 14px;
}
.currentList > ul > .liSelect {
  background-color: #fff;
  border-left: 5px solid rgb(1, 186, 144);
}
.hideBar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}
</style>