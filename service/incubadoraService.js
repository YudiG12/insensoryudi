var Request = require('tedious').Request;
var Connection = require('tedious').Connection;
var TYPES = require('tedious').TYPES;
var Incubadora = require('../models/incubadora');
var config = require('../config');

module.exports = class IncubadoraService {

    getIncubadoras() {

        return new Promise((resolve, reject) => {

            const connection = new Connection(config);
            let listaIncubadoras = [];

            connection.on('connect', function (err) {

                const request = new Request("select * from incubadora", function (err, rowCount) {
                    if (err)
                        reject(err)
                    connection.close()
                });

                request.on('row', function (columns) {

                    var incubadora = new Incubadora();
                    incubadora.idIncubadora = columns[0].value;
                    incubadora.codigo = columns[1].value;
                    incubadora.status = columns[2].value;
                    listaIncubadoras.push(incubadora);
                    resolve(listaIncubadoras);

                });

                connection.execSql(request)

            });
        });

    }





    
}