<template>
    <div class="music">
        <div class="Tab">
            <p class="myLove" :class="{active: isActive}" @click="switchLove">我喜欢的</p>
            <p class="recent" :class="{active: !isActive}" @click="switchRecent">最近听的</p>
        </div>
        <p class="suiji">
            <span class="icon icon-suiji"></span>
            随机播放全部
        </p>
        <div class="loveList" ref="loveList" v-show="isActive"></div>
        <div class="oldList" ref="oldList" v-show="!isActive">
        <ul>
        <li v-for="item in musicl" @click="Splay(item)">
          <img :src="item.img" alt="">
          <div>
            <span>{{ item.music_name }}</span>
            <span>{{ item.singer }}</span>
            <input type="hidden" value="">
          </div>
        </li><li></li>
      </ul>
      </div>
    </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
    export default {
        data() {
        return {
          musicl: this.$store.state.oldMusic,
          isActive: true
        };
    },
    created() {
        },
    mounted() {
      this.$nextTick(() => {
              this._initScroll();
            })
    },
    methods: {
      // 滚动插件
      _initScroll() {
        this.loveScorll = new BScroll(this.$refs.loveList, {
          click: true,
          HWCompositing: true,
          preventDefault: false
        });
        this.oldScorll = new BScroll(this.$refs.oldList, {
          click: true,
          HWCompositing: true,
          preventDefault: false
        });
      },
      // 点击播放
      Splay(item) {
          this.$store.commit('playMusic', item);
          this.$store.commit('isplay', {isPLaying:true});
          this.$store.state.audio.play();
      },
      switchLove() {
        this.isActive = true;
      },
      switchRecent() {
        this.isActive = false;
      }
      }
    };
</script>

<style>
.music {
  position: absolute;
  width: 100%;
  top: 100px;
  bottom: 4em;
  overflow: hidden;
}

.Tab {
    width: 100%;
    display: flex;
    margin: 10px 0;
    justify-content: center;
}

.myLove, .recent {
    width: 40%;
    text-align: center;
    font-size: 14px;
    padding: 5px 0;
    border-radius: 5px 0px 0px 5px;
    border: 1px solid rgb(1,186,144);
}

.recent {
    border-radius: 0px 5px 5px 0px;
    border-left: none;
}

.myLove {
    border-right: none;
}

.active {
    background-color: rgb(1,186,144);
    color: #fff;
}

.suiji {
    width: 30%;
    margin: 15px auto;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    border: 1px solid rgb(1,186,144);
    text-align: center;
    padding: 0 10px;
    font-size: 13px;
}
.music .icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    display: inline-block;
}
.icon-suiji {
    background: url(suiji.svg) no-repeat;
    background-size: cover;
}
.oldList {
  height: 100%;
  position: absolute;
  width: 100%;
  overflow: hidden;
}
</style>