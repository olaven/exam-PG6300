/**
 * 
 * NOTE: This file is partially copied from: 
 * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/app.js
 */
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const dataApi = require("./routes/data-api")
const authApi = require("./routes/auth-api"); 

const app = express();

//to handle JSON payloads
app.use(bodyParser.json());

//TODO: Add websocket support
//WsHandler.init(app);


app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));


passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {
                message: 'Invalid username/password'
            });
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user !== null) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());


//--- Routes -----------
// Routes: 
app.use("/api", dataApi)
app.use('/api', authApi);

// api-routes that are not matched by above routers
app.all('/api*', (req, res) => {
    res.status(404).send(); 
}); 


//If 404 -> just return index
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {
    app
};
