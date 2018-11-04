var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const sql = require('mssql');
const config = require('../config');

// Lista de incubadoras - index
router.get('/', ensureLoggedIn('/login?fail=true'), function (req, res, next) {
    sql.connect(config).then(() => {
        return sql.query`select * from incubadora`
    }).then(result => {
        sql.close()
        res.render('incubadoras/index', { incubadoras: result.recordset });
    }).catch(err => {
        console.dir(err);
    })
});

// create incubadora - GET
router.get('/create', function (req, res, next) {
    res.render('./incubadoras/create');
});

// create incubadora - POST
router.post('/create', function (req, res, next) {

    let codigo = req.body.codigo;
    let status = 0;
    sql.connect(config).then(() => {
        return sql.query`insert into incubadora values(${codigo},${status})`
    }).then(resultado => {
        sql.close()
        res.redirect('/incubadoras');
    }).catch(err => {
        sql.close()
        console.log(err);
    })

});

// incubadora details
router.get('/details/:id', function (req, res, next) {
    let id = req.params.id;
    sql.connect(config).then(() => {
        return sql.query`select * from incubadora where idIncubadora = ${id}`
    }).then(result => {
        sql.close();
        res.render('./incubadoras/details', { incubadora: result.recordset[0] });
        console.log(result.recordset[0]);
    }).catch(err => {
        sql.close();
        console.log(err);
    })
});

// medição json
router.get('/medicao/:id', (req, res, next) => {
    let id = req.params.id;
    sql.connect(config).then(() => {
        return sql.query`select Max(idMedicao), temperatura, umidade from medicao where fkIncubadora = ${id} group by idMedicao, temperatura, umidade`
    }).then(result => {
        sql.close();
        res.json(result.recordset[0]);
    }).catch(err => {
        sql.close();
        console.log(err);
    });
});

module.exports = router;