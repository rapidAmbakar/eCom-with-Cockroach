const pdb = require('../database/postgres.js');
const jwt = require('jsonwebtoken');


function createJWT(user) {
    return jwt.sign(user, 'cat');
}


module.exports.check = function(req, res) {
    res.send('Hi')
}


module.exports.checkLogin = async function(req, res) {
    const { email, password } = req.body;
    //qry = "Select * from users where email='k@g.com' and password = '123'";

    await pdb.query(`SELECT * FROM users where email='${email}' and password = '${password}'`, (err, result) => {
        if (err) console.error(err);
        else {
            if (result.rows.length == 0) {
                res.send('Email or Password wrong <a href="/db/login">go here </a');
            } else {
                console.log('Success! in login');

                const jwt = createJWT(result.rows[0]);
                //console.log(jwt);

                res.cookie('jwt', jwt, { httpOnly: true });

                //Cookie.set('jwt', jwt)
                role = result.rows[0].role;
                if (role === "Customer") {
                    res.redirect('/panel/customer');
                } else {
                    res.redirect('/panel/admin');
                }

            }
        }
    });
}


module.exports.checkGoogle = async function(req, res) {

    const gfName = req.user.given_name;
    const glName = req.user.family_name;
    const gEmail = req.user.email;

    await pdb.query(`SELECT * FROM users WHERE email = '${gEmail}'`, (err, result) => {
        if (err) console.error(err);
        else {
            if (result.rows.length == 0) {
                //res.send('Email or Password wrong <a href="/db/login">go here </a');
                res.render('createGUser', { user: req.user });
            } else {
                console.log('Success! in login');

                const jwt = createJWT(result.rows[0]);
                console.log(jwt);

                res.cookie('jwt', jwt, { httpOnly: true });

                //Cookie.set('jwt', jwt)
                role = result.rows[0].role;
                if (role === "Customer") {
                    res.redirect('/panel/customer');
                } else {
                    res.redirect('/panel/admin');
                }

            }
        }
    });
}

module.exports.checkFacebook = async function(req,res){
    console.log('Facebook Auth Done!')

    //const gfName = req.user.given_name;
    //const glName = req.user.family_name;
    const gEmail = req.user.emails[0].value;

    await pdb.query(`SELECT * FROM users WHERE email = '${gEmail}'`, (err, result) => {
        if (err) console.error(err);
        else {
            if (result.rows.length == 0) {
                //res.send('Email or Password wrong <a href="/db/login">go here </a');
                res.render('createGUser', { user: req.user });
            } else {
                console.log('Success! in login');

                const jwt = createJWT(result.rows[0]);
                console.log(jwt);

                res.cookie('jwt', jwt, { httpOnly: true });

                //Cookie.set('jwt', jwt)
                role = result.rows[0].role;
                if (role === "Customer") {
                    res.redirect('/panel/customer');
                } else {
                    res.redirect('/panel/admin');
                }

            }
        }
    });
}



module.exports.signUp = async function(req, res) {

    const { fname, lname, email, role, password, submit } = req.body;
    console.log(fname, lname, email, role, password, submit);
    await pdb.query(`INSERT INTO users(fname, lname, email, role, password) VALUES('${fname}', '${lname}', '${email}', '${role}', '${password}')
                `, (err, result) => {
        if (err) console.error(err);
        else {
            console.log('Success: Insertion in User Table');
            res.redirect('/');
        }
    });
};



module.exports.logout = function(req, res) {
    res.clearCookie('jwt');
    res.redirect('/');
}

module.exports.registerProduct = function(req, res) {
    res.render('registerProduct');
}
module.exports.createProduct = async function(req, res) {
    const { pname, quantity, company } = req.body;
    await pdb.query(`
                INSERT INTO product(name, quantity, company) VALUES('${pname}', '${quantity}', '${company}')
                `, (err, result) => {
        if (err) console.error(err);
        else {
            console.log('Success: Insertion in Product Table');
            res.redirect('/panel/admin');
        }
    });
}


module.exports.registerUser = function(req, res) {
    res.render('signup');
}
module.exports.createUser = async function(req, res) {
    const { fname, lname, email, role, password, submit } = req.body;
    console.log(fname, lname, email, role, password, submit);
    await pdb.query(`INSERT INTO users(fname, lname, email, role, password) VALUES('${fname}', '${lname}', '${email}', '${role}', '${password}')
                `, (err, result) => {
        if (err) console.error(err);
        else {
            console.log('Success: Insertion in User Table');
            res.redirect('/panel/admin');
        }
    });
}

module.exports.edusers = async function(req, res) {
    console.log(req.body)
    if (req.body.submit == "Delete") {
        const uid = req.body.uid;
        console.log(uid);
        await pdb.query(`DELETE FROM users where uid = '${uid}'`, (err, result) => {

            if (err) console.error(err);
            else {

                console.log('Success: Deleted in User');
                res.redirect('/panel/admin');
            }
        });
    } else if (req.body.submit == "Edit") {

        const { uid, fname, lname, email, role, password, submit } = req.body;
        await pdb.query(`UPDATE users SET fname = '${fname}', lname = '${lname}', email = '${email}', role = '${role}', password = '${password}' WHERE uid = '${uid}'`, (err, result) => {
            if (err) console.error(err);
            else {
                console.log('Success: Updated in User Table');
                res.redirect('/panel/admin');
            }
        });
    }
}

module.exports.edproduct = async function(req, res) {
    if (req.body.submit == "Delete") {
        const pid = req.body.pid;
        console.log(req.body);
        await pdb.query(`DELETE FROM product where pid = '${pid}'`, (err, result) => {

            if (err) console.error(err);
            else {
                console.log('Success: Deleted from Product');
                res.redirect('/panel/admin');
            }
        });
    } else if (req.body.submit == "Edit") {
        const { pid, name, quantity, company, submit } = req.body;
        await pdb.query(`UPDATE product SET name = '${name}', quantity = '${quantity}', company = '${company}' WHERE pid = '${pid}'`, (err, result) => {
            if (err) console.error(err);
            else {
                console.log('Success: Updated from Product');
                res.redirect('/panel/admin');
            }
        });
    }

}