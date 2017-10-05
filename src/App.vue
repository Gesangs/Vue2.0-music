<template>
  <div>
    <v-header></v-header>
    <transition>
      <router-view></router-view>
    </transition>
    <v-play></v-play>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import play from './components/play/play.vue';

  export default {
    components: {
      "v-header":header,
      "v-play":play
    }
  };
</script>

<style>
</style>
