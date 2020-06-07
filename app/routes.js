const totalvoilationscontroller = require("../controller/totalVoilationsMail");
const speedviolationscontroller = require("../controller/speedVoilationsMail");
const stopviolationscontroller = require("../controller/stopVoilationsMail");
const routeviolationscontroller = require("../controller/routeVoilationsMail");
const previoustablecontroller = require("../controller/viewPrevious");

module.exports = function(app, passport) {
    app.get('/', function(req,res){
        res.render('index.ejs');
    });

    app.get('/login', function(req,res){
        res.render('login.ejs', {message:req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login',{
        successRedirect:'/profile',
        failureRedirect:'/login',
        failureFlash: true
    }),
    function(req, res){
        if(req.body.remember){
            req.session.cookie.maxAge = 1000 * 60 * 3;
        }else{
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

    app.get('/profile' , isLoggedIn, function(req,res){
        res.render('profile.ejs', {
            user:req.user
        });
    });

    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    })

    //total violations
    app.post("/totalviolations", isLoggedIn,totalvoilationscontroller.totalvoilations);

    //speed violations
    app.get("/speedviolations", isLoggedIn,speedviolationscontroller.speedvoilations);

    //stoppage violations
    app.get("/stopviolations", isLoggedIn,stopviolationscontroller.stopvoilations);

    //route violations
    app.get("/routeviolations", isLoggedIn,routeviolationscontroller.routevoilations);

    //previous files
    app.get("/previous", isLoggedIn,previoustablecontroller.previousTable);

    //update contact details
    app.get("/updatecontact", isLoggedIn,function(req,res){
        res.render('updatecontact.ejs',{status:null});
    });
};


function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
    return next();

res.redirect('/');
}