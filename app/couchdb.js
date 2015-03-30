const cradle = require('cradle');

var couchdb = function (host, port) {
    this.connection = new ( cradle.Connection)(host, port, {
        cache: true,
        raw: false
    });

    this.db = this.connection.database('auth');
};

couchdb.prototype.findAll = (cb) => {
    this.db.view('auth/all', (err, result) => {
        if (err) {
            cb(err);
        } else {
            var docs = [];
            result.forEach(row => docs.push(row));
            cb(null, docs);
        }
    });
};

couchdb.prototype.findByid = (id, cb) => {
    this.db.get(id, (err, result) => {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};

couchdb.prototype.save = (user, cb)=> {
    this.db.save(user, (err, result) => {
        if (err) callback(err);
        else cb(null, user);
    });
};

module.exports = couchdb;