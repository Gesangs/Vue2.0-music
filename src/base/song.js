export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
}
// 拼接url、处理歌曲名
export function handleSong(music) {
    return new Song({
        id: music.songid,
        mid: music.songmid,
        singer: handleSinger(music.singer),
        name: music.songname,
        album: music.albumname,
        duration: music.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${music.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${music.songid}.m4a?fromtag=46`
    })
}
// 可能会有多名歌手
function handleSinger(singer) {
        let ret = []
      if (!singer) {
        return ''
      }
      singer.forEach((s) => {
        ret.push(s.name)
      })
      return ret.join(' | ')
      }