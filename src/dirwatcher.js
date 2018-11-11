const publicEventEmitter = require('./global-event-emiiter').PublicEventEmitter;
const fs = require('fs');


let handledFiles = [];

class DirWatcher {

    constructor(path, delay) {
        this.path = path;
        this.delay = delay
    }

    watch() {
        var path = this.path;

        setInterval(function () {
            startDirectoryWatcher(path);
        }, this.delay);
    }
}

function startDirectoryWatcher(path) {
    var pid = Math.floor((Math.random() * 10) + 1);
    var currentFiles = fs.readdirSync(path);
    if (currentFiles.length == 0) {
        console.log(`${pid}. Now files in directory`);
        return;
    }

    currentFiles.forEach(element => {
        console.log(`${pid}. currentFiles Iteration: ${element}`);
    });

    handledFiles.forEach(element => {
        console.log(`${pid}. handledFiles Iteration: ${element}`);
    });

    var newFiles = filterNewFiles(handledFiles, currentFiles);
    if (newFiles.length == 0) {
        console.log(`${pid}. Now new files in directory`);
        return;
    }

    newFiles.forEach(element => {
        console.log(`${pid}. Foreach Iteration: ${element}`);
    });

    if (newFiles.length > 0) {
        publicEventEmitter.emit('changed', newFiles);
        handledFiles = currentFiles;
    }
}

function filterNewFiles(oldFiles, newFiles) {
    var result = newFiles.filter(function (item) {
        return oldFiles.indexOf(item) === -1;
    });

    // result.forEach(element => {
    //     console.log("Foreach ITeration: " + element);

    // });

    return result;
}

module.exports = DirWatcher;