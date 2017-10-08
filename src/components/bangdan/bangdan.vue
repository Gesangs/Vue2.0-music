<template>
    <div class="rank">
        <scroll :data="topList" class="rankscorll" ref="ranklist">
            <div>
            <router-link to="/TopList"v-for="item in topList">
                <div @click="selectItem(item)" class="rankList" >
                <img :src="item.picUrl" alt="">
                <div class="rankRight">
                    <p class="song" v-for="(song,index) in item.songList">
                        <span>{{index + 1}}.{{song.songname}}-{{song.singername}}</span>
                    </p>
                </div>
            </div>
            </router-link>
        </div>
    </scroll>
</div>
</template>

<script>
import {getTopList,getMusicList} from '../../api/rank.js';
import Scroll from '../scroll.vue'
    export default {
        components: {
            Scroll
        },
        data() {
            return {
                topList:[]
            }
        },
        created() {
            this._getRank()
        },
        methods: {
            _getRank() {
                getTopList().then((res) => {
                    if(res.code === 0) {
                        this.topList = res.data.topList;
                    }
                })
            },
            selectItem(item) {
                getMusicList(item.id).then((res) => {
                    if(res.code === 0) {
                        this.$store.state.topList = [];
                       this.$store.state.topList = res.songlist
                       this.$store.state.topUrl = res.topinfo.MacDetailPicUrl;
                    }
                });

            }
        }
    };
</script>

<style>
    .rank {
  position: absolute;
  width: 100%;
  top: 100px;
  bottom: 4em;
  overflow: hidden;
}

.rankList {
    display: flex;
    margin: 30px;
}

.rankscorll {
    height: 100%;
    overflow: hidden;
}

.rankList img {
    height: 90px;
    flex: 0 0 90px;
    width: 90px;
}

.rankRight {
    flex: 1;
    padding: 0 20px;
    line-height: 30px;
    font-size: 13px;
}

.rankRight p ,span {
    width: 100%;
    /*文本超出宽度的时候省略号*/
    /*white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;*/
    display:-webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical;
    overflow:hidden;
}
</style>