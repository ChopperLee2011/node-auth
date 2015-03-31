// load the things we need
const cradle = require('cradle'),
    modella = require('modella'),
    validators = require('modella-validators'),
    bcrypt = require('bcrypt-nodejs');
//couchdb = require('../couchdb');
//var couchdb = require('../couchdb');

var User = modella('User');

User.use(validators);


User.attr('_id')
    .attr('username')
    .attr('displayName')
    .attr('provider')
    .attr('providerIdentifierField')
    .attr('providerData')
    .attr('email', {require: true, format: 'email'})
    .attr('password', {require: true});

/**
 * _id and _rev are for CouchDB.
 */

//User.attr('_id')
//    .attr('_rev');

User.save = function (user) {
    var db = new ( cradle.Connection)('http://127.0.0.1', 5984, {
        cache: true,
        raw: false
    }).database('auth');
    db.save(user.email, user, function (err, res) {
        // Handle response
    });
};
// define the schema for our user model
//var userSchema = mongoose.Schema({
//
//    local            : {
//        email        : String,
//        password     : String,
//    },
//    facebook         : {
//        id           : String,
//        token        : String,
//        email        : String,
//        name         : String
//    },
//    twitter          : {
//        id           : String,
//        token        : String,
//        displayName  : String,
//        username     : String
//    },
//    google           : {
//        id           : String,
//        token        : String,
//        email        : String,
//        name         : String
//    }
//
//});

// generating a hash
//userSchema.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//};
//
//// checking if password is valid
//userSchema.methods.validPassword = function(password) {
//    return bcrypt.compareSync(password, this.local.password);
//};
//User.saveOAuthUserProfile = function (req, providerUserProfile, done) {
//    if (!req.user) {
//        // Define a search query fields
//        var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
//        var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;
//
//        // Define main provider search query
//        var mainProviderSearchQuery = {};
//        mainProviderSearchQuery.provider = providerUserProfile.provider;
//        mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];
//
//        // Define additional provider search query
//        var additionalProviderSearchQuery = {};
//        additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];
//
//        // Define a search query to find existing user with current provider profile
//        var searchQuery = {
//            $or: [mainProviderSearchQuery, additionalProviderSearchQuery]
//        };
//
//        User.findOne(searchQuery, function (err, user) {
//            if (err) {
//                return done(err);
//            } else {
//                if (!user) {
//                    var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');
//
//                    User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
//                        user = new User({
//                            firstName: providerUserProfile.firstName,
//                            lastName: providerUserProfile.lastName,
//                            username: availableUsername,
//                            displayName: providerUserProfile.displayName,
//                            email: providerUserProfile.email,
//                            provider: providerUserProfile.provider,
//                            providerData: providerUserProfile.providerData
//                        });
//
//                        // And save the user
//                        user.save(function (err) {
//                            return done(err, user);
//                        });
//                    });
//                } else {
//                    return done(err, user);
//                }
//            }
//        });
//    } else {
//        // User is already logged in, join the provider data to the existing user
//        var user = req.user;
//
//        // Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
//        if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
//            // Add the provider data to the additional provider data field
//            if (!user.additionalProvidersData) user.additionalProvidersData = {};
//            user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;
//
//            // Then tell mongoose that we've updated the additionalProvidersData field
//            user.markModified('additionalProvidersData');
//
//            // And save the user
//            user.save(function (err) {
//                return done(err, user, '/#!/settings/accounts');
//            });
//        } else {
//            return done(new Error('User is already connected using this provider'), user);
//        }
//    }
//};

// create the model for users and expose it to our app
module.exports = User;
