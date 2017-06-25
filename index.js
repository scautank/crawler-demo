/**
 * main
 */

const Crawler = require('crawler');
const Store = require('./store');

// config
const vQQList = require('./config/v_qq');

let stores = {};

const crawler = new Crawler({
    maxConnections: 1,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const uri = res.request.uri;
            const store = stores[uri.pathname];

            if (!store) {
                return;
            }

            // 获取元素
            const $ = res.$;
            const $figuresListItems = $('.figures_list .list_item');

            $figuresListItems.each((i, item) => {
                let value = {};

                processFigure($, item, value);
                processFigureTitleScore($, item, value);
                processFigureDesc($, item, value);
                processCount($, item, value);

                store.add(value);
            });

            store.end();

            // console.log(uri);
            // console.log($('.filter_item.current.open').text());
        }
        done();
    }
});

vQQList.listObj.forEach((v) => {
    stores[v.id] = new Store(v.id);
    crawler.queue(v.uri);
});

crawler.on('drain', () => {
    stores = {};
    console.log('end.');
});

function processFigure($, el, value) {
    const $figure = $(el).find('.figure');

    value.img = $figure.find('img').attr('src');
    value.desc = $figure.find('.figure_info').text();
}

function processFigureTitleScore($, el, value) {
    const $figureTitleScore = $(el).find('.figure_title_score');

    value.title = $figureTitleScore.find('.figure_title a').text();
    value.score = $figureTitleScore.find('.score_l').text() + $figureTitleScore.find('.score_s').text();
}

function processFigureDesc($, el, value) {
    const $figureDesc = $(el).find('.figure_desc');
    const actors = [];

    $figureDesc.find('a').each((i, item) => {
        actors.push({
            name: $(item).text(),
            link: $(item).attr('href')
        });
    });

    value.actors = actors;
}

function processCount($, el, value) {
    const $figureCount = $(el).find('.figure_count');

    value.count = $figureCount.find('.num').text();
}


