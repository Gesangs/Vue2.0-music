<template>
  <div>
    <v-header></v-header>
      <router-view></router-view>
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
</style>
