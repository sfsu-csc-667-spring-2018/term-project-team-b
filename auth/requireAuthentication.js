function requireAuthentication(request, response, next){
    if (request.isAuthenticated()) {
        console.log("Authenticated!");
        return next();
    }
    else {
        console.log("not Authenticated!");
        response.redirect('/');
    }
};

module.exports = requireAuthentication;
