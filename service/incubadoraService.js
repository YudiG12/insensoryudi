var Request = require('tedious').Request;
var Connection = require('tedious').Connection;
var TYPES = require('tedious').TYPES;
var Incubadora = require('../models/incubadora');
var config = require('../config');

module.exports = class IncubadoraService {

    // LISTA DE INCUBADORAS
    getIncubadoras() {
        return new Promise((resolve, reject) => {

            const connection = new Connection(config);
            let listaIncubadoras = [];

            connection.on('connect', function (err) {

                const request = new Request("select * from incubadora", function (err, rowCount) {
                    if (err)
                        reject(err);
                    connection.close();
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

    // CRIAR INCUBADORA
    postIncubadora(incubadora) {
        return new Promise((resolve, reject) => {

            const connection = new Connection(config);

            connection.on('connect',function(err) {

                let codigo = incubadora.codigo;
                let status = incubadora.status;

                const request = new Request("insert into incubadora values (@codigo,@status);", function(err,rowCount) {
                    if(err)
                        reject(err);
                    else {
                        resolve(true);
                    }
                    connection.close();
                });
                request.addParameter('codigo',TYPES.Decimal,codigo);
                request.addParameter('status',TYPES.Bit,status);
                connection.execSql(request);
            });
        }) ;      
    }

    // SELECT INCUBADORA pelo ID
    GetIncubadoraPorId(idIncubadora) {
        return new Promise((resolve,reject) => {

            const connection = new Connection(config);

            connection.on('connect',function(err) {

                var id = idIncubadora;

                const request = new Request("select * from incubadora where idIncubadora = @id;",function(){
                    connection.close();
                });

                request.addParameter('id',TYPES.Decimal,id);

                request.on('row',function(columns) {

                   var incubadora = new Incubadora();
                   incubadora.idIncubadora = columns[0].value;
                   incubadora.codigo = columns[1].value;
                   incubadora.status = columns[2].value;
                   resolve(incubadora);

                });
                connection.execSql(request);
            });
        });
    }


}