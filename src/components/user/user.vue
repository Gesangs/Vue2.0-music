<template>
    <div class="music">
        <div class="Tab">
            <p class="myLove" :class="{active: !isActive}" @click.stop="switchLove">我喜欢的</p>
            <p class="recent" :class="{active: isActive}" @click.stop="switchRecent">最近听的</p>
        </div>
        <scroll class="oldList" :data="oldmusic" ref="oldlist" v-show="isActive">
          <song-list :songs="oldmusic"></song-list>
        </scroll>
        <scroll class="loveList" :data="lovemusic" ref="lovelist" v-show="!isActive">
          <song-list :songs="lovemusic"></song-list>
        </scroll>
    </div>
    </div>
</template>

<script>
 import Scroll from '../../base/scroll.vue';
 import SongList from '../../base/song-list.vue';
 import {deleteFavorite,loadPlay,loadFavorite} from '../../api/localStorage.js'
export default {
  components: {
          Scroll,
          SongList
        },
    data() {
        return {
            oldmusic:loadPlay(),
            liindex:'',
            lovemusic:loadFavorite(),
            isActive: true,
        }
    },
    watch:{
            oldmusic:function() {
                 this.$nextTick(() => {
                this.$refs.oldlist.refresh()
            })
            },
            lovemusic:function() {
                 this.$nextTick(() => {
                this.$refs.lovelist.refresh()
            })
            },
        },
    methods:{
        switchRecent() {
            this.isActive = true;
            this.oldmusic = loadPlay();
            this.$nextTick(() => {
                this.$refs.oldlist.refresh()
            })
        },
        switchLove() {
            this.isActive = false;
            this.lovemusic = loadFavorite();
            this.$nextTick(() => {
                this.$refs.lovelist.refresh()
            })
        },
        deletefavorite(item,index) {
          deleteFavorite(item);
          this.lovemusic.splice(index,1);
        },
      Mplay(list, item) {
          this.$store.commit('pushList', list);
          this.$store.commit('playMusic', this.$store.state.currentList[item]);
          this.$store.commit('isplay', {isPLaying:true});
          this.$store.state.audio.play();
      },
    }
};
</script>

<style>
.music {
    position: absolute;
    width: 100%;
    top: 72px;
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
    border: 1px solid rgb(1, 186, 144);
    /*#01BA90*/
}
.recent {
    border-radius: 0px 5px 5px 0px;
    border-left: none;
}
.myLove {
    border-right: none;
}
.active {
    background-color: rgb(1, 186, 144);
    color: #fff;
}
.suiji {
    width: 30%;
    margin: 15px auto;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    border: 1px solid rgb(1, 186, 144);
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
.oldList, .loveList {
    width: 100%;
    position: absolute;
    height: 100%;
    overflow: hidden;
}
.delll {
    position: relative;
}
.dell {
    width: 20px;
    height: 20px;
    background: url(del.svg);
    background-size: cover;
    position: absolute;
    margin: 19px 19px 0 0;
    top: 1px;
    right: 1px;
}
</style>