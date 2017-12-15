<template>
  <div class="loading">
    <img width="40" height="40" src="./Eclipse.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在载入..."
    }
  }
};
</script>
<style>
.loading {
  width: 100%;
  text-align: center;
}
.desc {
  line-height: 20px;
  font-size: 14px;
  color: black;
}
</style>