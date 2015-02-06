module.exports = function(app){
    /// Ловим ошибку 404 и передаём ему нашему обработчику ниже
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /// error handlers

    // Обработчик ошибок в режиме разработки
    // напечатает stacktrace
    if (app.get('env') === 'development') {

        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // Обычный обработчик ошибок
    // без stacktrace для юзеров
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
