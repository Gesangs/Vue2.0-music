<template>
  <div class="header">
    <div class="shang">
        <span class="iconfont icon-mune" @click="mune"></span>
        <span>轻&nbsp;&nbsp;听</span>
    </div>
    <div class="mune" v-if="isClick">
        <a href="https://github.com/Gesangs/Vue2.0-music"><span class="mune1"></span></a>
        <span style="width:160px; margin-top:20px;"><a href="https://github.com/Gesangs/Vue2.0-music">如果你喜欢这个app，点击这里加颗星~</a></span>
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

.mune {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 250px;
    height: 400px;
    background: rgba(0,0,0,0.8);
    z-index: 30;
    border-radius: 10px;
    display: flex;
    align-items:center;
    flex-direction:column;
}

.mune a{
    color: #fff;
}
.mune1 {
    background: url(github.jpg);
    display: block;
    border-radius: 40px;
    background-size: cover;
    width: 40px;
    margin-top: 120px;
    height: 40px;
}
</style>




