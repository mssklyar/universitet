module.exports = function(app){
   app.use('/', require('routes/main'));
   app.use('/users', require('routes/users'));
   app.use('/univer', require('routes/univer'));
   app.use('/login', require('routes/login'));
   app.use('/logout', require('routes/logout'));
   app.use('/main', require('routes/frontpage'));
}
