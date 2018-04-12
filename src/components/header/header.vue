<template>
  <div class="header">
    <router-link to="/user" class="item">
      我的
    </router-link>
    <router-link to="/find" class="item">
      发现
    </router-link>
    <router-link to="/bangdan" class="item">
      榜单
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClick: false
    };
  },
  methods: {
    mune() {
      this.isClick = !this.isClick;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.header {
  width: 100%;
  background: rgb(1, 186, 144);
  color: #fff;
  font-family: "微软雅黑";
  z-index: 19;
  padding: 5px 10px 3px 10px;
  display: flex;
  justify-content: center;
}

.header .item {
  flex: 1;
  display: block;
  height: 40px;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  color: #fff;
  font-size: 15px;
}

.header .router-link-active {
  border-bottom: 2px #fff solid;
}

.header .iconfont {
  width: 15px;
  height: 15px;
}
</style>




