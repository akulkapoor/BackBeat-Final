/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , $ = require('jquery')
  , path = require('path');
var app = express();
var config = require("./config");

var User = require("./models/user")

var passport = require("passport"),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user,done) {
  done(null,user.id)
})

passport.deserializeUser(function(id,done) {
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
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({secret: 'fasfasasasfasfa'}));
  app.use(passport.initialize());
  app.use(passport.session())
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function(){
  app.use(express.errorHandler());
});
app.post('/test.html', likeTheBand);

function likeTheBand(req,res) {
  console.log(req.body.name)
  res.end('aaa');
  /*
  if (req.user !== undefined) {
    var data = req.body.name;
    if (req.body.name == undefined) {
      console.log("s")
    }
    console.log(req.body.name);
    req.user.bands = data;
    req.user.save();
    res.end("success!")
  }*/
}

awesome = function() {
    console.log("we did it!")
  }

$.ajax({
    url:"http://128.237.134.199:3000/test.html",
    data: {'name':'hello'},
    type: "POST",
    success: awesome,
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
    }
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});  