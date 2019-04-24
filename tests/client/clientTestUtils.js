

const getTestUser = (friendEmails, postIds) => {

	return {
		email: "test@user.com",
		password: "test",
		givenName: "TEST_GIVEN",
		familyName: "TEST_FAMILY",
		dateOfBirth: "24/04/1980", 
		location: "Oslo",
		friendEmails: friendEmails,
		postIds: postIds
	};
};

module.exports = {

	getTestUser
}; 