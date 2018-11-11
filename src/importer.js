const fs = require('fs');
const publicEventEmitter = require('./global-event-emiiter').PublicEventEmitter;
const CsvToJson = require('./csv-to-json');

const csvToJson = new CsvToJson();

class Importer {
    constructor() { }

    start() {
        publicEventEmitter.on('changed', (files) => {
            importFile(files)
        });
    }
}

function importFile(files) {
    for (var i = 0; i < files.length; i++) {
        const jsonAsString = csvToJson.convert(files[i]);
        fs.writeFileSync(`./import/${files[i]}`, jsonAsString);
    }
}

module.exports = Importer;