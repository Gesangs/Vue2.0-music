import { getMusicVkey } from "../api/search";

// 判断这首歌是否在喜欢列表中
export const isLove = function({ commit, state }, musicId) {
  let index = state.loveMusic.findIndex(item => {
    return item.id == musicId;
  });
  return index > -1;
};
// 添加到我喜欢
export const Love = function({ commit, state }, item) {
  if (!item.url) {
    return;
  }
  if (isLove({ commit, state }, item.id)) {
    commit("delLove", item);
    commit("setdialogMsg", "已取消");
  } else {
    commit("addLove", item);
    commit("setdialogMsg", "已添加");
  }
  diaShow({ commit, state });
};

export const diaShow = function({ commit }) {
  clearTimeout(times);
  commit("setdialogShow", true);
  var times = setTimeout(function() {
    commit("setdialogShow", false);
  }, 1600);
};

export const insertNext = function({ commit, state }, music) {
  commit("insertCurrentList", music);
  commit("setpopupShow", false);
  console.log(state.currentList);
};

export const Splay = function({ commit, state }, obj) {
  getMusicVkey(obj.item.mid).then(res => {
    const vkey = res.data.items["0"].vkey;
    const url = `http://dl.stream.qqmusic.qq.com/C400${obj.item.mid}.m4a?vkey=${vkey}&guid=3655047200&fromtag=66`;
    const music = Object.assign({}, obj.item, { index: obj.index, url });
    commit("playMusic", music);
    if (obj.songlist) {
      commit("pushList", obj.songlist);
    }
    commit("isplay", true);
    commit("addOld", music);
    state.audio.play();
  });
};
