var flash = require('connect-flash')
  , express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;


var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});



// Passport Local
// ----------------------------------------------------------
passport.use(new LocalStrategy(
        function (username, password, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                
                // Find the user by username.  If there is no user with the given
                // username, or the password is not correct, set the user to `false` to
                // indicate failure and set a flash message.  Otherwise, return the
                // authenticated `user`.
                findByUsername(username, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                    if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                    return done(null, user);
                })
            });
        }
    ));

var app = express();

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser')
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../../public'));


app.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});

app.get('/login', function (req, res) {
    res.render('login', { user: req.user, message: req.flash('error') });
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function (req, res) {
    var result = {};
    
    result.session_id = req.user.username + ":" + (new Date());
    res.type("application/json");
    res.send(result);
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



app.listen(3000);




// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    
    var authenticated = false;
    
    if (req.cookies.auth_page) {
        // Cookie based Checks
        return next();
    }
    
    if (req.isAuthenticated()) {
        // Passport check
        return next();
    }
    
    // ultimately
    res.redirect('/login');
}
