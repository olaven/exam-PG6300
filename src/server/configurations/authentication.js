/**
 * 
 * NOTE: This file is partially copied from: 
 * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/app.js
 */
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const Users = require("../database/users");

passport.use(new LocalStrategy({
	usernameField: "username",
	passwordField: "password"
},
function (username, password, done) {

	const ok = Users.verifyUser(username, password);

	if (!ok) {
		return done(null, false, {
			message: "Invalid username/password"
		});
	}

	const user = Users.getUser(username);
	return done(null, user);
}
));


passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(function (username, done) {

	const user = Users.getUser(username);

	if (user !== null) {
		done(null, user);
	} else {
		done(null, false);
	}
});



const configureAuthentication = (app) => {
    
	app.use(session({
		secret: "a secret used to encrypt the session cookies",
		resave: false,
		saveUninitialized: false
	}));

	app.use(passport.initialize());
	app.use(passport.session());
};

module.exports = {
	configureAuthentication
};