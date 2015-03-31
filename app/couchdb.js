var cradle = require('cradle');

var couchdb = function (host, port , dbname) {
    this.db =  new ( cradle.Connection)(host, port, {
        cache: true,
        raw: false
    }).database(dbname);

    return this.db;
};


couchdb.prototype.findAll = function (cb) {
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

couchdb.prototype.findByid = function (id, cb) {
    this.db.get(id, (err, result) => {
        if (err) {
            cb(err);
        } else {
            cb(null, result);
        }
    });
};

couchdb.prototype.save = function (doc, cb) {
    this.db.save(user, (err, result) => {
        if (err) callback(err);
        else cb(null, user);
    });
};

module.exports = couchdb;