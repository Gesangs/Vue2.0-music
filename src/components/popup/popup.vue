<template>
    <div class="popup">
        <div class="musicDetail">
            <p>歌曲：{{ musicDetail.name }}</p>
              <ul>
                  <li>下一首播放</li>
                  <li>添加到我喜欢</li>
                  <li>歌手：{{ musicDetail.singer }}</li>
                  <li>专辑：{{  }}</li>
                  <li>来源: {{  }}</li>
              </ul>
        </div>
    </div>
</template>
<script>
    export default {
      props: {
        musicDetail: {
          type:Object,
          default:{}
        }
      }
    }
</script>
<style>
    .popup {
      position: fixed;
      width: 100%;
      bottom: 5px;
      top: 0;
      left: 0;
      overflow: hidden;
      z-index: 50;
      background: rgba(7, 17, 27, 0.6);
    }

    .musicDetail {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 45%;
      background-color: #fff;
    }
    .musicDetail > p {
      font-size: 12px;
      padding: 8px 10px;
    }
    .musicDetail > ul > li {
      height: 40px;
      padding: 2px 10px;
      line-height: 40px;
      border-bottom: 1px solid rgba(1,186,144,0.3);
    }
</style>