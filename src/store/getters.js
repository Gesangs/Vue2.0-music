export const isPlaying = state => state.isPlaying;

export const Music = state => state.Music;

export const Image = state => `url(${state.Music.image})`;

export const selectMusic = state => state.selectMusic;

export const audio = state => state.audio;

export const oldMusic = state => state.oldMusic;

export const loveMusic = state => state.loveMusic;

export const searchHistory = state => state.searchHistory;

export const currentList = state => state.currentList;

export const detailMid = state => state.detailMid;

export const isDisplay = state => state.isDisplay;

export const dialogMsg = state => state.dialogMsg;

export const dialogShow = state => state.dialogShow;

export const popupShow = state => state.popupShow;
