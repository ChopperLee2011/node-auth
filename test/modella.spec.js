var modella = require('modella');
var validators = require('modella-validators');
var User = modella('User');

User.use(validators);

User
    .attr('_id')
    .attr('username', {required: true})
    .attr('email', {required: true, format: 'email'})
    .attr('admin', {defaultValue: false});

var user = new User({
    username: 'bob',
    email: 'bob@bobbington.com'
});
// user.admin() === false
var adminUser = new User({
    username: 'bobs_boss',
    email: 'boss@bobbington.com',
    admin: true
})
console.info('adminUser', adminUser);
console.info('result', adminUser.username());