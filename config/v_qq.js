/**
 * config
 */

const url = require('url');
const listArr = [
    'http://v.qq.com/x/list/movie', // 电影
    'http://v.qq.com/x/list/tv', // 电视剧
    'http://v.qq.com/x/list/variety', // 综艺
    'http://v.qq.com/x/list/cartoon', // 动漫
    'http://v.qq.com/x/list/children', // 少儿
    'http://v.qq.com/x/list/music', // 音乐
    'http://v.qq.com/x/list/doco', // 纪录片
    'http://v.qq.com/x/list/news', // 新闻
    'http://v.qq.com/x/list/ent', // 娱乐
    'http://v.qq.com/x/list/sports', // 体育
    'http://v.qq.com/x/list/games', // 游戏
    'http://v.qq.com/x/list/fun' // 搞笑
];

const listObj = listArr.map((item) => {
    const urlObj = url.parse(item);

    return {
        id: urlObj.pathname,
        uri: item
    };
});

module.exports = {
    listArr,
    listObj
};
