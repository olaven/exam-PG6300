const friendRequests = []

const persist = (from, to) => {

    const request = {
        from, to
    }; 
    
    friendRequests.push(request); 
}

const retrieveFrom = from => 
    friendRequests.filter(request => request.from === from); //? 

const retrieveTo = to => 
    friendRequests.filter(request => request.to === to); 

const remove = (from, to) => {
    friendRequests = friendRequests
        .filter(request => request.from === request.from && request.to === to)
}

const clear = () => {
    friendRequests.length = 0; 
}


module.exports = {
    persist,
    retrieveFrom, 
    retrieveTo, 
    clear
}