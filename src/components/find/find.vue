<template>
  <transition name="fade">
    <div class="find">
      <!-- 搜索框 -->
      <div class="search">
        <input type="search" placeholder="歌曲、歌手、专辑" v-model="msg" @keyup.enter="search(msg)">
        <i v-show="msg" @click="Blur">取消</i>
      </div>
      <!-- 热门搜索 -->
      <div class="hotSearch" v-show="!msg">
        <div class="hot">热门搜索</div>
        <div class="hotList">
          <p v-for="(item, index) in hotkey" @click="search(item.k)" :key='index'>{{ item.k }}</p>
        </div>
      </div>
      <!-- 搜索历史 -->
      <div class="searchHistory" v-show="!msg &&  searchHistory[0]">
        <div class="hot">搜索历史<span class="iconfont icon-del" @click="clearHistory"></span></div>
        <div class="historyList" ref="history">
          <ul>
          <p v-for="(item, index) in searchHistory" :key='index' @click="search(item)">
            {{ item }}
            <span class="iconfont icon-del_1" @click.stop="delHistory(item)"></span>
          </p>
          </ul>
        </div>
      </div>
      <!-- 搜索结果 -->
        <div class="singer" @click="searchSinger(singer.mid)" v-show="msg && singer.name">
          歌手：<span v-html="singer.name"></span>
        </div>
        <div class="album" @click="searchAlbum(album.mid)" v-show="msg && album.name">
          专辑：<span v-html="album.name"></span>
        </div>
      <scroll :data="musics"
              :pullup="pullup"
              @scrollToEnd="searchMore"
              @scroll="Bblur()"
              class="sResult"
              v-show="msg">
        <song-list :songs="musics"></song-list>
      </scroll>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import SongList from "../../base/song-list.vue";
import Scroll from "../../base/scroll.vue";
import { getHotKey, search } from "../../api/search.js";
import { handleSong } from "../../base/song.js";
import { clearAll } from "../../api/localStorage.js";

const perpage = 10;

export default {
  components: {
    SongList,
    Scroll
  },
  data() {
    return {
      msg: "",
      musics: [],
      hotkey: [],
      singer: {},
      album: {},
      pullup: true,
      isMore: true,
      page: 1
    };
  },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  created() {
    this._gethotKey();
  },
  methods: {
    ...mapMutations([
      "addHistory",
      "setDetailTypes",
      "setDetailMid",
      "clearHistory",
      "delHistory"
    ]),
    ...mapActions(["savePlayHistory"]),
    // 当焦点在输入框， 滚动搜索结果时使输入框失去焦点
    // 因为在移动端浏览器中，焦点在输入框时，点击或滚动将呼出键盘
    Bblur() {
      document.activeElement.blur();
    },
    Blur() {
      this.msg = "";
    },
    // 搜索
    search(msg) {
      this.isMore = true;
      this.msg = msg;
      search(msg, this.page, false, perpage).then(res => {
        if (res.code === 0) {
          const song = res.data.song;
          this.musics = this.handleList(song.list);
          this.singer = song.list["0"].singer[0];
          this.album = {
            mid: song.list["0"].albummid,
            name: song.list["0"].albumname
          };
          this.addHistory(msg);
          this.checkMore(res.data);
        }
      });
    },
    // 上拉加载更多
    searchMore() {
      if (!this.isMore) {
        return;
      }
      this.page++;
      search(this.msg, this.page, false, perpage).then(res => {
        if (res.code === 0) {
          const song = res.data.song;
          // this.musics = this.musics.concat(this.handleList(song.list));
          this.musics = [...this.musics, ...this.handleList(song.list)];
          this.checkMore(res.data);
        }
      });
    },
    // 检查还有没有更多
    checkMore(data) {
      const song = data.song;
      if (
        !song.list.length ||
        song.curnum + song.curpage * perpage > song.totalnum
      ) {
        this.isMore = false;
      }
    },
    // 歌手专辑搜索
    searchSinger(id) {
      this.setDetailMid(id);
      this.$router.push({
        path: `/singerDetail`
      });
    },
    searchAlbum(id) {
      this.setDetailMid(id);
      this.$router.push({
        path: `/albumDetail`
      });
    },
    // 遍历返回的数据，做数据提取处理
    handleList(list) {
      const List = [];
      list.forEach(item => {
        const music = handleSong(item);
        List.push(music);
      });
      return List;
    },
    // 获取热搜词
    _gethotKey() {
      getHotKey().then(res => {
        if (res.code === 0) {
          this.hotkey = res.data.hotkey.splice(0, 12);
        }
      });
    }
  }
};
</script>

<style scopeId>
@import "./font_find/iconfont.css" .find {
  position: absolute;
  width: 100%;
  top: 72px;
  bottom: 3.8em;
  overflow: hidden;
  background-color: #fff;
}
.search {
  width: 100%;
  padding: 5px 0;
  height: 46px;
  background-color: rgb(235, 237, 239);
  border-bottom: 1px solid rgba(1, 186, 144, 0.8);
  display: flex;
}
.search input {
  flex: 1;
  border-radius: 5px;
  border: none;
  height: 30px;
  background-color: #fff;
  margin: 7px 30px 30px 30px;
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
  box-sizing: border-box;
}
.hotList > p {
  border-radius: 10px;
  background-color: rgb(235, 237, 239);
  padding: 6px 10px;
  margin: 5px 12px;
  font-size: 13px;
}
.searchHistory {
  margin-top: 30px;
}
.historyList {
  height: 230px;
  overflow: hidden;
}
.historyList > ul > p {
  text-indent: 30px;
  padding: 10px 0px;
  font-size: 14px;
}
.sResult {
  position: absolute;
  width: 100%;
  top: 200px;
  bottom: 1px;
  overflow: hidden;
}
.singer,
.album {
  text-indent: 20px;
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 11px;
  border-bottom: 1px solid rgba(1, 186, 144, 0.8);
}

.find .icon-del,
.find .icon-del_1 {
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 18px !important;
  float: right;
  color: black;
}

.find .icon-del {
  margin-right: 30px;
}
</style>
