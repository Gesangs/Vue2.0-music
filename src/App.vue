<template>
  <div>
    <v-header></v-header>
      <router-view></router-view>
      <keep-alive>
    <v-play @showLists="showplaylist"></v-play>
  </keep-alive>
    <transition name="fade">
      <div class="dialog" v-show="dialogShow">{{ this.dialogMsg }}</div>
    </transition>
    <v-popup v-if="popupShow"></v-popup>
    <v-list ref="playList"></v-list>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import header from "./components/header/header.vue";
import play from "./components/play/play.vue";
import popup from "./components/popup/popup.vue";
import currentList from "./components/currentList/currentList.vue";

export default {
  components: {
    "v-header": header,
    "v-play": play,
    "v-popup": popup,
    "v-list": currentList
  },
  computed: {
    ...mapGetters(["dialogMsg", "dialogShow", "popupShow", "isShowList"])
  },
  methods: {
    showplaylist() {
      this.$refs.playList.show();
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
  cursor: text;
}
.dialog {
  padding: 0 15px;
  height: 30px;
  border-radius: 30px;
  background-color: rgba(7, 17, 27, 0.6);
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  color: #fff;
  line-height: 30px;
  text-align: center;
  z-index: 50;
}
.Layer {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 5px;
  background: rgba(7, 17, 27, 0.8);
  z-index: 30;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slideB-enter-active,
.slideB-leave-active,
.slideU-enter-active,
.slideU-leave-active {
  transition: all 0.4s;
}
.slideB-enter,
.slideB-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slideU-enter,
.slideU-leave-to {
  transform: translate3d(-100%, 0, 0);
}
</style>
