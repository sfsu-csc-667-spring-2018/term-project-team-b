const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_QUERY =
    'INSERT INTO users (email, hash, name) VALUES (${email}, ${hash}, ${name}) RETURNING id';
const create = (email, password, name, cb) =>{
    bcrypt.hash(password, 10)
        .then(hash => {
            db
                .one(CREATE_QUERY, {email, hash, name})
                .then(user =>{
                    console.log(user);
                    cb(user.id);
                })
        })
};

const find = (email,userID) => {
    db.one('SELECT * FROM users WHERE email=${email}', {email})
        .then(user =>
        {
            userID(user);
        })
        .catch(error => console.log('error!', error));
};
const serialize = (user, done) => {
    console.log('serialize', user);
    done(null, user.id);
};

const deserialize = (id, done) => {
    db
        .one('SELECT * FROM users WHERE id=${id}', {id})
        .then(user => {
            done(null, user);})
        .catch(error => done(error));
};

module.exports = {
    create,
    find,
    serialize,
    deserialize
};