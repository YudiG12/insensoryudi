var express = require('express');
var router = express.Router();
var IncubadoraService =  require('../service/IncubadoraService');
var Incubadora = require('../models/incubadora');

var incubadoraService = new IncubadoraService();

// Lista de incubadoras - index
router.get('/',function(req,res,next) {
    incubadoraService.getIncubadoras().then((incubadoras) => {
        res.render('./incubadoras/index',{ incubadoras: incubadoras });
    }).catch((err) => {
        console.log(err);
    });
});

// create incubadora - GET
router.get('/create',function(req,res,next) {
    res.render('./incubadoras/create');
});

// create incubadora - POST
router.post('/create',function(req,res,next) {
    var incubadora = new Incubadora();
    incubadora.codigo = req.body.codigo;
    incubadora.status = 0;

    incubadoraService.postIncubadora(incubadora).then((resultado) => {
        res.redirect('/incubadoras');
    });
});

// incubadora details
router.get('/details/:id',function(req,res,next) {
    incubadoraService.GetIncubadoraPorId(req.params.id).then((incubadora) => {
        res.render('./incubadoras/details',{ incubadora: incubadora });
    });
});

// medição json
router.get('/medicao/:id',function(req,res,next) {
    incubadoraService.getMedicao(req.params.id).then((medicao) => {
        res.json(medicao);
    });
});

module.exports = router;