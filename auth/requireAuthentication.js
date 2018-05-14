const requireAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        console.log("Authenticated!");
        return next();
    } else {
        //response.redirect('/lobby');
        console.log("not Authenticated!");
        return next();
    }
};

module.exports = requireAuthentication;
