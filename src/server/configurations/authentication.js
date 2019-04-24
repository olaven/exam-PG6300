/**
 * 
 * NOTE: This file is copied and adapted: 
 * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/src/server/app.js
 */
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const Users = require("../database/users");

passport.use(new LocalStrategy({
	usernameField: "email",
	passwordField: "password"
},
function (email, password, done) {

	const ok = Users.verifyUser(email, password);
	
	if (!ok) {
		return done(null, false, {
			message: "Invalid email/password"
		});
	}
	
	const user = Users.getUser(email);
	return done(null, user);
}
));


passport.serializeUser(function (user, done) {

	//NOTE: No password is sent back 
	const serializedUser = {
		email: user.email,
		givenName: user.givenName,
		familyName: user.familyName,
		dateOfBirth: user.dateOfBirth,
		location: user.location,
		friendEmails: user.friendEmails,
		postIds: user.postIds
	}; 

	done(null, serializedUser);
});

passport.deserializeUser(function (user, done) {

	// NOTE: Retrieving the user from db, as password is needed.
	const persistedUser = Users.getUser(user.email);

	if (persistedUser) {
		done(null, persistedUser);
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