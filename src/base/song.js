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

export function handleSong(music) {
    return new Song({
        id: music.songid,
        mid: music.songmid,
        singer: strDecode(handleSinger(music.singer)),
        name: strDecode(music.songname),
        album: music.albumname,
        duration: music.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${music.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${music.songid}.m4a?fromtag=46`
    })
}

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


function strDecode(str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
          return String.fromCharCode(parseInt($2 , $1 ? 16:10));
      });
    }