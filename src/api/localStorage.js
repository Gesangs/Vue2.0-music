// localStorage 本地存储

import storage from "good-storage";

const searchKey = "__search__";
const searchLen = 7;

const playKey = "__play__";
const playLen = 100;

const loveKey = "__favorite__";
const loveLen = 100;

function insertArray(arr, val, compare, maxLen) {
  // 判断元素是否存在，避免重复添加
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  // 如果已超出范围就删掉老的记录
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function saveSearch(query) {
  // 获取本地记录
  let searches = storage.get(searchKey, []);
  // 插入新的纪录
  insertArray(
    searches,
    query,
    item => {
      return item === query;
    },
    searchLen
  );
  // 再存入本地记录
  storage.set(searchKey, searches);
  return searches;
}

export function deleteSearch(query) {
  let searches = storage.get(searchKey, []);
  deleteFromArray(searches, item => {
    return item === query;
  });
  storage.set(searchKey, searches);
  return searches;
}

export function clearSearch() {
  storage.remove(searchKey);
  return [];
}

export function loadSearch() {
  return storage.get(searchKey, []);
}

export function savePlay(song) {
  let songs = storage.get(playKey, []);
  insertArray(
    songs,
    song,
    item => {
      return song.id === item.id;
    },
    playLen
  );
  storage.set(playKey, songs);
  return songs;
}

export function loadPlay() {
  return storage.get(playKey, []);
}

export function saveFavorite(song) {
  let songs = storage.get(loveKey, []);
  insertArray(
    songs,
    song,
    item => {
      return song.id === item.id;
    },
    loveLen
  );
  storage.set(loveKey, songs);
  return songs;
}

export function deleteFavorite(song) {
  let songs = storage.get(loveKey, []);
  deleteFromArray(songs, item => {
    return item.id === song.id;
  });
  storage.set(loveKey, songs);
  return songs;
}

export function deletePlay(song) {
  let songs = storage.get(playKey, []);
  deleteFromArray(songs, item => {
    return item.id === song.id;
  });
  storage.set(playKey, songs);
  return songs;
}

export function loadFavorite() {
  return storage.get(loveKey, []);
}

export function clearAll() {
  storage.set(playKey, []);
  storage.set(loveKey, []);
}
