<template>
    <div class="find">
      <!-- 搜索框 -->
      <div class="search">
        <input type="search" placeholder="在线搜索" v-model="msg" @focus="Focus" @keyup.enter="search(msg)">
        <i v-show="isShowkey" @click="Blur">取消</i>
      </div>
      <!-- 热门搜索 -->
      <div class="hotSearch" v-show="!isShowkey">
        <div class="hot">热门搜索</div>
        <div class="hotList">
          <p v-for="item in hotkey" @click="search(item.k)">{{ item.k }}</p>
        </div>
      </div>
      <!-- 搜索历史 -->
      <div class="searchHistory" v-show="del && !isShowkey &&  history[0]">
        <div class="hot">搜索历史<span class="iconfont icon-del" @click="delHistory"></span></div>
        <div class="historyList" ref="history">
          <ul>
          <p v-for="item in history" @click="search(item)">
            {{ item }}
            <!-- <span class="iconfont icon-del_1"></span> -->
          </p>
          </ul>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="sResult" ref="resultList"  v-show="isShowkey">
        <ul>
        <li v-for="item in musics" @click="Splay(item)">
          <img :src="handleImg(item)" alt="">
          <div>
            <span>{{ strDecode(item.songname) }}</span>
            <span>{{ strDecode(handleSinger(item)) }}</span>
          </div>
        </li><li></li>
      </ul>
      </div>
    </div>
</template>

<script>
 import BScroll from 'better-scroll';
 import {getHotKey,search} from '../../api/search.js';
 import {ERR_OK} from '../../api/config.js';
  export default {
    data() {
        return {
          msg: '',
          musics: [],
          hotkey:[],
          history:[],
          del: true,
          isShowkey: false
        };
    },
    created() {
      this._gethotKey();
      this.history = this.$store.state.searchHistory;
    },
    watch: {
      history: function() {
        return this.$store.state.searchHistory;
      }
    },
    methods: {
      // 去抖函数的实现
    // debounce(fn, delta, context) {
    //     var timeoutID = null;
    //     return function() {
    //       clearTimeout(timeoutID);
    //       var args = arguments;
    //       timeoutID = setTimeout(function() {
    //         fn.apply(context, args);
    //       }, delta);
    //     };
    //   },
      // 搜索
      search(msg) {
        msg = msg.trim();
        this.msg = msg;
            search(msg, 1, false, 15).then((res) => {
          if(res.code === ERR_OK) {
            this.musics = res.data.song.list;
            console.log(this.musics)
            this.isShowkey = true;
            this.$store.commit("addHistory",msg);
            this.$nextTick(() => {
              this._initResultScroll();
              this.history = this.$store.state.searchHistory;
            })
          }
      })
    },
      // 拼接url
      handleImg(img) {
        return "https://y.gtimg.cn/music/photo_new/T002R300x300M000"+ img.albummid +".jpg?max_age=2592000";
      },
      handleMusic(music) {
        return "http://ws.stream.qqmusic.qq.com/"+ music.songid +".m4a?fromtag=46";
      },
      handleSinger(sing) {
        let len = sing.singer.length;
        let name = [];
        if(len) {
          for(let i=0; i < sing.singer.length;i++) {
            name.push(sing.singer[i].name);
          }
          return name.join(" | ");
        }else{
          return sing.singer[0].name;
        }
      },
      Focus() {
        this.isShowkey = true;
      },
      Blur() {
        this.isShowkey = false;
        this.musics = [];
      },
      // 滚动插件
      _initResultScroll() {
        this.resultScorll = new BScroll(this.$refs.resultList, {
          click: true,
          HWCompositing: true,
          preventDefault: false
        });
      },
      _gethotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotkey = res.data.hotkey.splice(0,12);
          }
        })
      },
      // 点击播放
      Splay(item) {
        let music = {
          img: this.handleImg(item),
          music:this.handleMusic(item),
          music_name: this.strDecode(item.songname),
          singer: this.strDecode(this.handleSinger(item)),
          id: item.songid,
          mid: item.songmid
        };
          this.$store.commit('playMusic', music);
          this.$store.commit('isplay', {isPLaying:true});
          this.$store.commit("addOld",music);
          this.$store.state.audio.play();
      },
      // 解决外语显示不正常
      strDecode(str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
          return String.fromCharCode(parseInt($2 , $1 ? 16:10));
      });
    },
    delHistory() {
      this.del = false;
      this.$store.commit("addOld",0);
      this.history.length = 0;
    }
  }
}
</script>

<style>
.find {
  position: absolute;
  width: 100%;
  top: 102px;
  bottom: 4em;
  overflow: hidden;
}
.search {
    width: 100%;
    padding: 5px 0;
    height: 46px;
    background-color: rgb(235, 237, 239);
    border-bottom: 1px solid rgba(1,186,144,0.8);
    display: flex;
}
.search input {
    flex: 1;
    border-radius: 5px;
    border: none;
    height: 30px;
    background-color: #fff;
    margin: 7px 30px 30px;
    text-indent: 25px;
}
.search i {
    height: 46px;
    line-height: 46px;
    flex: 0 0 60px;
    width: 60px;
}
.hotSearch {
  width: 100%;
  margin-top: 20px;
}
.hot {
  display: block;
  padding: 0px 0 10px 30px;
  position: relative;
}
.hotList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
}
.hotList > p {
  border-radius: 10px;
  background-color:rgb(235, 237, 239);
  padding: 6px 10px;
  margin: 5px 12px;
  font-size: 13px;
}
.searchHistory {
  margin-top: 30px;
}
.historyList {
  height: 300px;
  overflow: hidden;
}
.historyList > ul > p {
  padding: 10px 30px;
  font-size: 14px;
}
.sResult {
  height: 100%;
  position: absolute;
  width: 100%;
  top: 57px;
  overflow: hidden;
}
li {
    width:100%;
    height: 60px;
    display: flex;
}
li > img {
    flex: 0 0 35px;
    width: 35px;
    height: 35px;
    margin: 15px;
}
li >div {
    flex: 1;
    height: 64px;
    border-bottom: 1px solid rgba(1,186,144,0.3);
}
li > div > span:nth-child(1) {
    display: block;
    margin-top: 12px;
    color: rgb(1,186,144);
}
li > div > span:nth-child(2) {
    display: block;
    margin-top: 5px;
    font-size: 12px;
}
li > span {
    display: block;
    float: right;
}
.find .iconfont {
  width: 18px;
  height: 18px;
  display: inline-block;
}
.icon-del {
  background: url(del.svg) no-repeat;
  background-size: cover;
  position: absolute;
  right: 45px;
  top: 3px;
}
.icon-del_1 {
  background: url(del_1.svg) no-repeat;
  background-size: cover;
  position: absolute;
  right: 45px;
}
</style>