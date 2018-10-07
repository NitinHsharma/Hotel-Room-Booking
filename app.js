const express = require('express');
// Require Modules
const app = express();
const bodyparser = require('body-parser');
const config = require('./config/config.json');

/*
 *
 * MiddelWare
 *
 */
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '10mb' }));

/*
 * Routes
 */
require('./routes')(app);

/*
 * UnHandeled Routes
 */
app.use((req, res) => {
    res.statusCode = 404;
    res.send({
        errcode: '99',
        errmessage: 'Are you lost?',
        result: null
    });
});

/*
 * Broken Things
 */
app.use(function FiveHundredMiddleware(err, req, res) {
    console.error(err.stack);
    res.statusCode = 500;
    res.send({
        errcode: '99',
        errmessage: 'Something broke!',
        result: null
    });
});


/*
 * Server Listing
 */
app.listen(config.app.port, () => {
    console.log('app is started at ', config.app.port);
})