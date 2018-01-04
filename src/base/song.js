export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
}
// 可能会有多名歌手
function handleSinger(singer) {
  let ret = [];
  if (!singer) {
    return "";
  }
  singer.forEach(s => {
    ret.push(s.name);
  });
  return ret.join(" | ");
}
// 拼接url、处理歌曲名
export function handleSong(music) {
  return new Song({
    id: music.songid,
    mid: music.songmid,
    // 歌手信息
    singer: {
      name: handleSinger(music.singer),
      id: music.singer[0].id,
      mid: music.singer[0].mid
    },
    name: music.songname,
    // 专辑信息
    album: {
      id: music.albumid,
      mid: music.albummid,
      name: music.albumname
    },
    duration: music.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${music.albummid}.jpg?max_age=2592000`
  });
}
