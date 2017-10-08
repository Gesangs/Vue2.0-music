<template>
  <div>
    <v-header></v-header>
    <transition name="fade">
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
a   {
  text-decoration: none;
  color: black;
  cursor:text;
}
 .fade-enter-avtive, .fade-leave-active {
    transition: opacity .5s
}

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
