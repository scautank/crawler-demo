/**
 * main
 */

const Crawler = require('crawler');
const Store = require('./store');

// config
const vQQList = require('./config/v_qq');

const stores = {};

const crawler = new Crawler({
    maxConnections: 1,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const uri = res.request.uri;
            const $ = res.$;

            // console.log(uri);
            console.log($('.filter_item.current.open').text());
        }
        done();
    }
});

vQQList.listObj.forEach((v) => {
    stores[v.id] = new Store();
    crawler.queue(v.uri);
});

crawler.on('drain', () => {
    console.log('end.');
});
