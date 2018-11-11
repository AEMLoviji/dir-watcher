
const csv = require('csvtojson')
const fs = require('fs');

class CsvToJson {
    constructor() { }


    convert(csvFilePath) {

        csv()
            .fromFile(`./data/${csvFilePath}`)
            .then((jsonObj) => {
                console.log(jsonObj);
                /**
                 * [
                 * 	{a:"1", b:"2", c:"3"},
                 * 	{a:"4", b:"5". c:"6"}
                 * ]
                 */


                fs.writeFileSync(`./import/${csvFilePath}`, JSON.stringify(jsonObj));
                return jsonObj;
            });

    }
}

module.exports = CsvToJson;