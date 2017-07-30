exports.validateToken = function(req, res, next) {
    var authHeader = req.headers.authorization;
    var jwtToken = authHeader.replace("Bearer ", "");
    var decodedToken = jwtDecode(jwtToken);
    var authUserName = decodedToken.sub;
    console.log("In Validate Token");
    console.log(decodedToken);
    if (decodedToken.iss == req.body.accessToken) {
        return next();
    } else {
        res.send({ status: 401, message: "Authorisation Failed!" })
    }

};