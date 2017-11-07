<template>
    <div class="song-list">
        <ul>
            <li v-for="(item, index) in songs" @click="Splay(item, index)">
              <img v-lazy="item.image" alt="">
              <div>
                <span v-html="item.name"></span>
                <span v-html="item.singer"></span>
              </div>
            </li><li></li>
        </ul>
    </div>
</template>

<script>
import {savePlay} from '../api/localStorage.js';

    export default {
        props: {
            songs: {
                type: Array,
                default: []
            },
            types: {
                type: String,
                default: 'normal'
            }
        },
        methods: {
            // 点击播放
            Splay(item,index) {
              const music = Object.assign({},item,{index:index});
              this.$store.commit('playMusic', music);
              this.$store.commit('pushList', this.songs);
              this.$store.commit('isplay', {isPLaying:true});
              this.$store.commit("addOld",music);
              this.$store.state.audio.play();
            }
        }
    }
</script>

<style>
    li {
    width:100%;
    height: 60px;
    display: flex;
}
.song-list li > img {
    flex: 0 0 35px;
    width: 35px;
    height: 35px;
    margin: 15px;
}
.song-list li >div {
    flex: 1;
    height: 64px;
    border-bottom: 1px solid rgba(1,186,144,0.3);
}
.song-list li > div > span:nth-child(1) {
    display: block;
    margin-top: 12px;
    font-size: 14px;
    color: rgb(1,186,144);
}
.song-list li > div > span:nth-child(2) {
    display: block;
    margin-top: 5px;
    font-size: 12px;
}
.song-list li > span {
    display: block;
    float: right;
}
</style>