var express = require('express');
var router = express.Router();
var IncubadoraService =  require('../service/IncubadoraService');

var incubadoraService = new IncubadoraService;

router.get('/',function(req,res,next) {
    incubadoraService.getIncubadoras().then((incubadoras) => {
        res.render('./incubadoras/index',{ incubadoras: incubadoras });
    }).catch((err) => {
        console.log(err);
    });
});


module.exports = router;