const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_QUERY =
    'INSERT INTO users (email, pass, name) VALUES (${email}, ${hash}) RETURNING id, email';
const create = (email, pass, name) =>
    bcrypt.hash(pass, 10).then(password => db.one(CREATE_QUERY, { email, password, name }));

const find = email =>
    db.one('SELECT * FROM users WHERE email=${email}', { email });

const serialize = (user, done) => done(null, user.id);

const deserialize = (id, done) =>
    db
        .one('SELECT * FROM users WHERE id=${id}', { id })
        .then(({ id, email }) => done(null, { id, email }))
        .catch(error => done(error));

module.exports = {
    create,
    find,
    serialize,
    deserialize
};