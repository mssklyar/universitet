module.exports = function(app){
   app.use('/', require('routes/frontpage'));
   app.use('/users', require('routes/users'));
}
