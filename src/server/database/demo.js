/**
 * Adding demo data for use in development mode 
 */

const demoUsers = [
    {
        email: "dev@admin.com",
        password: "dev",
        givenName: "DEV_GIVEN",
        familyName: "DEV_FAMILY_NAME",
        dateOfBirth: "24/04/1080", //new Date().toLocaleDateString(),
        location: "Oslo",
        friendEmails: ["gandalf@arda.com", "sam@shire.com"], 
        postIds: [] 
    }, 
    {
        email: "frodo@shire.com",
        password: "secretly_wanting_that_ring",
        givenName: "Frodo",
        familyName: "Baggins",
        dateOfBirth: "22/09/2968", 
        location: "The Shire",
        friendEmails: ["sam@shire.com", "merry@shire", "pippin@shire", "gandalf@arda.com"], 
        postIds: [] //TODO: reference some posts 
    }, 
    {
        email: "sam@gamgee.com",
        password: "rosie",
        givenName: "Sam",
        familyName: "Gamgee",
        dateOfBirth: "29/04/2980", 
        location: "The Shire",
        friendEmails: ["frodo@shire.com", "merry@shire.com", "pippin@shire.com"], 
        postIds: [] //TODO: reference some posts 
    }, 
    {
        email: "merry@shire.com",
        password: "pints!",
        givenName: "Meriadoc",
        familyName: "Brandybuck",
        dateOfBirth: "11/04/2982",
        location: "The Shire",
        friendEmails: ["frodo@shire.com", "sam@shire.com", "pippin@shire.com"], 
        postIds: [] //TODO: reference some posts 
    }, 
    {
        email: "pippin@shire.com",
        password: "Not-a-fool.",
        givenName: "Peregrin",
        familyName: "Took",
        dateOfBirth: "24/12/2990", 
        location: "The Shire",
        friendEmails: ["frodo@shire.com", "sam@shire.com", "merry@shire.com"],
        postIds: [] //TODO: reference some posts 
    }, 
    {
        email: "gandalf@arda.com",
        password: "runrunrun",
        givenName: "Gandalf",
        familyName: "the Grey",
        dateOfBirth: "10/12/300",
        location: "Everywhere, really",
        friendEmails: ["frodo@shire.com"],
        postIds: [] 
    }
]

const demoPosts = [
    {
        authorEmail: "gandalf@arda.com", 
        content: "Had a lovely trip with Shadowfax today!",
        timestamp: new Date().getMilliseconds() 
    }, 
    {
        authorEmail: "gandalf@arda.com",
        content: "Come visit me for some ice cream!",
        timestamp: new Date().getMilliseconds()
    }, 
    {
        authorEmail: "frodo@shire.com",
        content: "I went for a walk in the woods.",
        timestamp: new Date().getMilliseconds()
    }, 
    {
        authorEmail: "gandalf@arda.com",
        content: "I am smoking from my pipe today. And tomorrow.",
        timestamp: new Date().getMilliseconds()
    }, 
    {
        authorEmail: "pippin@shire.com",
        content: "Let me know if anything happens!",
        timestamp: new Date().getMilliseconds()
    }, 
    {
        authorEmail: "merry@shire.com",
        content: "I have been getting taller lately.",
        timestamp: new Date().getMilliseconds()
    }, 
    {
        authorEmail: "sam@shire.com",
        content: "Master Frodo is almost as nice as my plants at home.",
        timestamp: new Date().getMilliseconds()
    }
]; 

const addDemoUsers = users => {
    demoUsers.forEach(user => {
        users.set(user.email, user); 
    }); 
}

const addDemoPosts = posts => {
    demoPosts.forEach(post => {
        posts.set(post.id, post);
    });
}

module.exports = {
    addDemoUsers, 
    addDemoPosts
}