import jsonp from "./jsonp.js";
import { commonParams, options } from "./config.js";
// 获取热搜关键词
export function getHotKey() {
  const url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: "h5"
  });

  return jsonp(url, data, options);
}
// 搜索接口
export function search(query, page, zhida, perpage) {
  const url = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp";

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: "utf-8",
    sem: 1,
    aggr: 0,
    remoteplace: "txt.mqq.all",
    uin: 0,
    needNewCode: 1,
    platform: "h5"
  });

  return jsonp(url, data, options);
}
// 获取歌手歌曲列表
export function getSingerDetail(singerId) {
  const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg";

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: "yqq",
    order: "listen",
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  });

  return jsonp(url, data, options);
}

export function getAlbumDetail(mid) {
  const url = "https://c.y.qq.com//v8/fcg-bin/fcg_v8_album_info_cp.fcg";

  const data = Object.assign({}, commonParams, {
    albummid: mid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: "detail",
    type: "top",
    platform: "h5"
  });

  return jsonp(url, data, options);
}

export function getMusicVkey(mid) {
  const url = "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg";

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: '205361747',
    uin: 0,
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid: '3655047200'
  });

  return jsonp(url, data);
}
