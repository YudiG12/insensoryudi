var express = require('express');
var router = express.Router();
var passport = require('passport');

// index login
router.get('/',function(req,res,next) {
    res.render('login', { message: null });
});

// GET login ?????????????????
router.get('/login',function(req,res,next) {
    if(req.query.fail)
        res.render('login',{ message: 'Usuário e/ou senha incorretos!'});
    else
        res.render('login',{ message: null });
});

// POST login
router.post('/login',
    passport.authenticate('local',{ failureRedirect: '/login'}),
    function(req,res) {
        res.redirect('/incubadoras');
    });

module.exports = router;