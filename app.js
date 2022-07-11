require('dotenv').config()
const express = require("express");

const { projectTitle } = require('./constants');

// Api controller
const tezosGenerateAddress = require('./app/rest/api/generateAddress');
const tezosTransaction = require('./app/rest/api/transaction');

// Mock controller
const tezosMockController = require('./app/rest/mock/transaction');

const app = express();

// Parse application/json
app.use(express.json({ strict: false }))

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))


// Configure swagger
swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
var swaggerDocument = require('./swagger.json');
const swaggerSpecs = swaggerJsdoc(swaggerDocument);


// Configure logger class
app.log = require('bunyan').createLogger({
    name: 'default'
});


// Route: swaggerUi
const swaggerOption = {
    swaggerOptions: {
        defaultModelsExpandDepth: -1,
    }
};

// Route: swagger ui
app.use(
    projectTitle.NAME + '/apidocs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs, swaggerOption)
);

// Route: tezos generate address
app.post(projectTitle.NAME + '/generate-address', async (req, res) => {
    await tezosGenerateAddress.generateAddress(app, req, res);
});

// Route: tezos transfer
app.post(projectTitle.NAME + '/transfer', async (req, res) => {
    await tezosTransaction.transfer(app, req, res);
});

// Route: tezos Mock node
app.all(projectTitle.NAME + '/mock/node/*', async (req, res) => {
    console.debug(`MOCK ${req.method} Path:${req.path} Body:${JSON.stringify(req.body)} Query:${JSON.stringify(req.query)}`)
    await tezosMockController.handler(app, req, res);
});

// Route: handle 404
app.use(function (req, res, next) {
    console.debug(`404 ${req.method} ${req.path}`)

    res.status(404).send({
        status: 404,
        message: 'URL not found',
    });
});

// Route: Handle 500
app.use(function (err, req, res, next) {
    console.debug(`500 ${req.method} ${req.path}`)
    console.error(err)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ status: 500, message: err.message || 'Internal Server error' });
});


module.exports = app;
