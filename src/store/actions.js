// 判断这首歌是否在喜欢列表中
export const isLove = function({commit, state}, musicId) {
    let index = state.loveMusic.findIndex((item) => {
      return item.id == musicId;
    })
    return (index > -1);
};
// 添加到我喜欢
export const Love = function({commit, state}, item) {
  if(!item.url) {
    return;
  }
  if(isLove({commit, state}, item.id)) {
    commit('delLove', item);
    commit('setdialogMsg', '已取消');
  }else{
    commit('addLove', item);
    commit('setdialogMsg', '已添加');
  }
  diaShow({commit, state});
}


export const diaShow = function({commit}) {
  clearTimeout(times);
  commit('setdialogShow', true);
  let times = setTimeout(function() {
    commit('setdialogShow', false);
  },1600)
}