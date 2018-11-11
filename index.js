const fs = require('fs');
const Dirwatcher = require('./src/dirwatcher');
const Importer = require('./src/importer');

const importDir = './import';
const dirToWatch = './data';
if (!fs.existsSync(importDir)) {
    fs.mkdirSync(importDir);
}

var importer = new Importer();
importer.start();

var dirWatcher = new Dirwatcher(dirToWatch, 2000);
dirWatcher.watch();
