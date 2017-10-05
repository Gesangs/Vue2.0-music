<template>
  <div class="header">
    <div class="shang">
        <span class="siadebar iconfont icon-mune"></span>
        <span>悦听</span>
        <span class="iconfont icon-search"></span>
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
}

.shang span {
    display: inline-block;
    font-size: 20px;
    margin: 5px 20px 5px 0;
    line-height: 20px;
}

.shang > span:nth-child(3) {
    float: right;
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
    height: 50px;
    text-align: center;
    line-height: 50px;
    text-decoration: none;
    color: #fff;
    font-size: 18px;
}

.xia .router-link-active {
    border-bottom: 2px #fff solid;
}


.icon-mune {
    background: url(mune.svg) no-repeat;
    background-size: cover;
}

.icon-search {
    background: url(fangdajing.svg) no-repeat;
    background-size: cover;
}
</style>




