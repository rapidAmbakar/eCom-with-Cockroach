const jwt = require('jsonwebtoken');

module.exports.userCheck = function(req, res, next) {
    const jwtt = req.cookies.jwt;
    if (!jwtt) {
        console.log('No JWT');
        res.redirect('/');
    } else {
        next();
    }
}


module.exports.checkLogged = function(req, res, next) {
    const jwtt = req.cookies.jwt;
    if (jwtt) {
        role = jwt.verify(jwtt, 'cat').role;
        /*if (!role) {
            if (role === 'Customer') res.redirect('/panel/customer')
            else res.redirect('/panel/admin')
        } else {
            res.redirect('/');
        }*/
        res.redirect('/panel/admin');
    } else {
        next();
    }
}