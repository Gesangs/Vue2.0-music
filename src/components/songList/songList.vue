<template>
    <div class="songList">
        <div class="sResult" ref="resultlist">
        <ul>
        <li v-for="item in musicList" @click="Splay(item)">
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
    export default {
        props: ['musicList'],
        // created() {
        //     this.$nextTick(() => {
        //     this._initResultScroll();
        // });
        // },
        // computed不行 两者的差别是什么
        watch:{
            musicList:function() {
                 this.$nextTick(() => {
                this._initResultScroll();
            })
            }
        },
        methods: {
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
          for(let i=0; i < len;i++) {
            name.push(sing.singer[i].name);
          }
          return name.join(" | ");
        }else{
          return sing.singer[0].name;
        }
      },
      _initResultScroll() {
        this.resultScorll = new BScroll(this.$refs.resultlist, {
          click: true,
          HWCompositing: true,
          preventDefault: false
        });
      },
      // 点击播放
      Splay(item) {
        let music = {
          img: this.handleImg(item),
          music:this.handleMusic(item),
          music_name: this.strDecode(item.songname),
          singer: this.strDecode(this.handleSinger(item)),
          id: item.songid,
          isLove: false
        };
          this.$store.commit('playMusic', music);
          this.$store.commit('isplay', true);
          this.$store.commit("addOld",music);
          this.$store.state.audio.play();
      },
      // 解决外语显示不正常
      strDecode(str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
          return String.fromCharCode(parseInt($2 , $1 ? 16:10));
      });
    }
        }
    }
</script>

<style>
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
</style>