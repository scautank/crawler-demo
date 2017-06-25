/**
 * 存储
 */

const path = require('path');
const fse = require('fs-extra');
const outputPath = path.join(__dirname, 'data');

class Store {
    constructor(id) {
        this.id = id || 'store';
        this.lists = [];
    }
    add(value) {
        this.lists.push(value);
    }
    end() {
        const filepath = path.join(outputPath, `${this.id}.json`);
        const data = {
            id: this.id,
            lists: this.lists
        };

        fse.outputFile(filepath, JSON.stringify(data, null, 4)).then(() => {
            console.log(`${this.id} output data success.`);
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = Store;
