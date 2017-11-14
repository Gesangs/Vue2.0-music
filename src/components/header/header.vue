<template>
  <div class="header">
    <div class="shang">
        <span>轻&nbsp;&nbsp;听</span>
    </div>
    <div class="xia">
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
  </div>
</template>

<script>
  export default {
    data() {
            return {
                isClick:false
            }
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
    background: rgb(1,186,144);
    color: #fff;
    font-family: "微软雅黑";
    z-index: 19;
}

.shang {
    /*display: flex;
    flex-direction: row;*/
}

.shang span {
    display: block;
    font-size: 20px;
    margin: 0 auto;
    line-height: 20px;
    padding: 5px;
    text-align: center;
}



.xia {
    padding: 5px 10px 3px 10px;
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 4px 0 rgb(1,186,144);
}

.xia .item {
    flex: 1;
    display: block;
    height: 30px;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
    color: #fff;
    font-size: 15px;
}

.xia .router-link-active {
    border-bottom: 2px #fff solid;
}

.header .iconfont {
    width: 15px;
    height: 15px;
}
</style>




