<template>
  <div>
    <v-header></v-header>
      <router-view></router-view>
    <v-play @diaShow="diaShow"></v-play>
    <transition name="diaFade">
      <div class="dialog" v-show="dialogShow">{{ this.Msg }}</div>
    </transition>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import play from './components/play/play.vue';

  export default {
    components: {
      "v-header":header,
      "v-play":play
    },
    data() {
      return {
        dialogShow: false,
      }
    },
    computed: {
      Msg() {
        return this.$store.state.dialogMsg;
      }
    },
    methods: {
      diaShow() {
        clearTimeout(times);
        this.dialogShow = true;
        var that = this;
        var times = setTimeout(function() {
          that.dialogShow = false;
        },1600)
      }
    }
  };
</script>

<style>
a   {
  text-decoration: none;
  color: black;
  cursor:text;
}
.dialog {
  padding: 0 15px;
  height: 30px;
  border-radius: 30px;
  background-color: rgba(7,17,27,0.6);
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translate3d(-50%,0,0);
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
.diaFade-enter-active, .diaFade-leave-active {
transition: all 0.6s;
}
.diaFade-enter, .diaFade-leave-to {
  opacity: 0;
}
</style>
