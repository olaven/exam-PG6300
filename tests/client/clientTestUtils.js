

const getTestUser = (friendEmails) => {

	return {
		email: "test@user.com",
		password: "test",
		givenName: "TEST_GIVEN",
		familyName: "TEST_FAMILY",
		dateOfBirth: "24/04/1980", 
		location: "Oslo",
		friendEmails: friendEmails
	};
};

module.exports = {

	getTestUser
}; 