<template>
  <div class="header">
    <div class="shang">
        <span class="iconfont icon-mune"></span>
        <span>轻&nbsp;&nbsp;听</span>
    </div>
    <div class="xia">
        <router-link to="/music" class="item">
          我的
        </router-link>
        <router-link to="/find" class="item">
          发现
        </router-link>
        <router-link to="/bangdan" class="item">
          榜单
        </router-link>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
.header {
    width: 100%;
    background: rgb(1,186,144);
    color: #fff;
    font-family: "微软雅黑";
    z-index: 19;
}

.shang {
    height: 10%;
    display: flex;
    flex-direction: row ;
}

.shang span {
    font-size: 20px;
    margin: 10px 10px 10px 30px;
    line-height: 20px;
    padding: 5px;
}



.xia {
    height: 10%;
    padding: 5px 10px 3px 10px;
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 4px 0 rgb(1,186,144);
}

.xia .item {
    flex: 1;
    display: block;
    height: 35px;
    text-align: center;
    line-height: 35px;
    text-decoration: none;
    color: #fff;
    font-size: 18px;
}

.xia .router-link-active {
    border-bottom: 2px #fff solid;
}

.header .iconfont {
    width: 20px;
    height: 20px;
}

.icon-mune {
    background: url(mune.svg) no-repeat;
    background-size: cover;
}
</style>




