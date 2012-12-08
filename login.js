/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , connect = require('connect')
  , mongoose = require('mongoose');
var app = express();
var config = require("./config");

var User = require("./models/user")

var passport = require("passport"),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user,done) {
  done(null,user.id)
})

passport.deserializeUser(function(id,done) {
  console.log(id);
  User.findOne(id, function(err,user) {
    done(err,user)
  });
});

passport.use(new FacebookStrategy({
    clientID: config.development.fb.appID,
    clientSecret: config.development.fb.appSecret,
    callbackURL: config.development.fb.url + "fbauthed"
    },
    function(accessToken, refreshToken,profile,done) {
      process.nextTick(function() {
        console.log(profile.id);
        var query = User.findOne({'fbID': profile.id})
        query.exec(function(err, oldUser) {
          if (oldUser) {
            console.log('Existing User: ' + oldUser.name + ' found and logged in!')
            console.log(oldUser.bands)
            done(null,oldUser)
          }
          else {
            var newUser = new User();
            newUser.fbID = profile.id
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;

            newUser.save(function(err) {
              if(err) throw err;
              console.log("New User: " + newUser.name + ' created and logged in!')
              done(null, newUser);
            });
          }
        });
      });
    })); 

function serveStaticFile(request, response) {
    //notify the user they're logged in. Necessary because
    //  we use the same html for logging in and when they're
    //  logged in
    if (request.user !== undefined){
      console.log("not undefined!")
        response.sendfile(__dirname + "/index.html");
    }
    else {
      console.log("undefined!")
        response.redirect("/");
    }
}

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({secret: 'fasfasasasfasfa'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
  app.use(express.errorHandler());
});
app.post('/aaa', function (req,res) {
  if (req.user !== undefined) {
    console.log(req.user);
    console.log(req.body);
    var data = req.body.name;
    if (req.user.bands.indexOf(data) === -1) {
      req.user.bands.push(data);
      console.log(req.user.name, req.user.bands);
      req.user.save();
    }
    else {
      req.user.bands.splice(req.user.bands.indexOf(data),1);
      console.log("removed!")
      console.log(req.user.name,req.user.bands);
      req.user.save();
    }
  }
  res.end()
})

app.post('/bbb', function (req,res) {
  if (req.user !== undefined) {
    var data = req.body.name;
    if (req.user.bands.indexOf(data) !== -1) {
      res.end("1");
    }
    else {
      res.end("0");
    }
  }
})

app.get('/', function(req,res) { res.redirect('fbauth')});
app.get('/index.html', serveStaticFile);
app.get('/fbauth', passport.authenticate('facebook'))
app.get('/fbauthed', passport.authenticate('facebook',{failureRedirect:'/',successRedirect:'/index.html'}))
app.get('/logout',function(req,res) {
    req.logOut();
    res.redirect('/');
})
app.get('/users', user.list);
var port = process.env.PORT || 3000;
app.listen(port);
