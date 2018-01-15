<template>
    <transition name="slideU">
    <div class="music">
        <div class="Tab">
            <p class="myLove" :class="{active: !isActive}" @click.stop="switchLove">我喜欢的</p>
            <p class="recent" :class="{active: isActive}" @click.stop="switchRecent">最近听的</p>
        </div>
        <scroll class="oldList" :data="oldMusic" ref="oldlist" v-show="isActive">
          <song-list :songs="oldMusic" :types="'old'"></song-list>
        </scroll>
        <scroll class="loveList" :data="loveMusic" ref="lovelist" v-show="!isActive">
          <song-list :songs="loveMusic" :types="'love'"></song-list>
        </scroll>
    </div>
    </div>
</transition>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "../../base/scroll.vue";
import SongList from "../../base/song-list.vue";
export default {
  components: {
    Scroll,
    SongList
  },
  data() {
    return {
      liindex: "",
      isActive: true
    };
  },
  computed: {
    ...mapGetters(["loveMusic", "oldMusic"])
  },
  methods: {
    switchRecent() {
      this.isActive = true;
      this.$nextTick(() => {
        this.$refs.oldlist.refresh();
      });
    },
    switchLove() {
      this.isActive = false;
      this.$nextTick(() => {
        this.$refs.lovelist.refresh();
      });
    }
  }
};
</script>

<style>
.music {
  position: absolute;
  width: 100%;
  top: 72px;
  bottom: 4em;
  overflow: hidden;
  background-color: #fff;
}
.Tab {
  width: 100%;
  display: flex;
  margin: 10px 0;
  justify-content: center;
}
.myLove,
.recent {
  width: 40%;
  text-align: center;
  font-size: 14px;
  padding: 5px 0;
  border-radius: 5px 0px 0px 5px;
  border: 1px solid rgb(1, 186, 144);
}
.recent {
  border-radius: 0px 5px 5px 0px;
  border-left: none;
}
.myLove {
  border-right: none;
}
.active {
  background-color: rgb(1, 186, 144);
  color: #fff;
}
.music .icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  display: inline-block;
}

.oldList,
.loveList {
  width: 100%;
  position: absolute;
  height: 100%;
  overflow: hidden;
}
.delll {
  position: relative;
}
.dell {
  width: 20px;
  height: 20px;
  background: url(del.svg);
  background-size: cover;
  position: absolute;
  margin: 19px 19px 0 0;
  top: 1px;
  right: 1px;
}
</style>