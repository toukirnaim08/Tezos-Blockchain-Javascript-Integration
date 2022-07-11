// Load libs
const render = require('es6-template-render');
const { load } = require('js-yaml');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { validate } = require('jsonschema');
const { cryptoUtils, Sotez } = require('sotez');

// Load files
const { transaction_validation_schema } = require('./validation');
const { KEYCHAIN, errorTypes } = require('../../../constants');

// Load error maps
const [error_map] = load(readFileSync(resolve(__dirname, '../../../error_map.yml')));

var tzRpcUrl = process.env.NODE_ENV === 'test' ? KEYCHAIN.tezos.mockNodeUrl : (process.env.TZ_RPC_URL || KEYCHAIN.tezos.nodeUrl2);

module.exports = {
    /**
     * @swagger
     * tags: "Transaction"
     * /tezos-integration/transfer:
     *   post:
     *     summary: Tezos transfer.
     *     description: Fires of a query from unido-transaction-service which performs a transfer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *                  sender: 
     *                      type: string
     *                      description: sender address
     *                      example: "tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s"
     *                  private_key: 
     *                      type: string
     *                      description: private key
     *                      example: "2267eeff3af4394e574bae8b86763ef95f5e1c22f68cc2636ab1b026b72f5300"
     *                  transactions: 
     *                      type: array
     *                      items:
     *                          $ref: '#/components/schemas/tezos_operation'
     *     responses:
     *       200:
     *         description: Transaction published.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                       hash:
     *                         type: string
     *                         description: tx hash.
     *                         example: "oog4LXx769tBfYWvn6vaD79jmZdSxQK8PwnK2xmYBggLtZxaysR"
     *                       error:
     *                         $ref: '#/components/schemas/error'
     *               required: [sender, key, transaction]
     *       400:
     *         description: Invalid payload.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                       hash:
     *                         type: string
     *                         description: tx hash.
     *                         example: null
     *                       error:
     *                         $ref: '#/components/schemas/error'
     */
    transfer: async (app, req, res) => {
        try {
            // check if the body is in the correct format
            // if not it generates 400 error
            error_message = validate_json_schema(req.body);
            if (error_message != null) {
                return res.status(400).send({
                    hash: null,
                    error: {
                        type: errorTypes.INVALID_PAYLOAD,
                        subtype: null,
                        message: error_message,
                    }
                });
            }

            var key = req.body.private_key;

            // Detect legacy key and parse it
            if (req.body.private_key.slice(32) === req.body.private_key.slice(0, 32)) {
                key = req.body.private_key.slice(32);
            }

            // In order to perform any actions that require a signature (transfer, delegate, originate, etc.) we need to import a secret key.
            // If need to import an encrypted key, we can also provide a passphrase as the second argument to the importKey method.
            const { sk } = await cryptoUtils.generateKeys(key);
            const tzRpc = new Sotez(tzRpcUrl);

            await tzRpc.importKey(sk);

            // create operations array as we support batch operation
            // if operations is null, it generates 400 error
            operations = await create_operations(req.body.transactions)
            if (operations == null) {

                app.log.error(`tezos error : Failed to create payload to process tezos transfer`);
                // mostly happens if invalid data found in request body
                return res.status(400).send({
                    hash: null,
                    error: {
                        type: errorTypes.INVALID_PAYLOAD,
                        subtype: null,
                        message: "Failed to create payload to process tezos transfer",
                    }
                });
            }

            try {
                const response = await tzRpc.sendOperation({ operation: operations })

                return res.send({
                    hash: response.hash,
                    error: null
                });
            } catch (err) {
                // BLOCKCHAIN ERROR : if fails to publish
                // We normally only expect one error to be returned, though err is an array. If more than one object is present we log it but only look at the first item
                error_type = extract_error_type(err[0]);
                error_message = create_error_message(app, err[0], req.body.private_key);

                return res.status(400).send({
                    hash: null,
                    error: {
                        type: errorTypes.BLOCKCHAIN_ERROR,
                        subtype: error_type,
                        message: error_message,
                    }
                });
            };
        } catch (e) {
            app.log.error(`tezos error : [${JSON.stringify(e)}]`);
            return res.status(500).send({
                hash: null,
                error: {
                    type: errorTypes.SYNTAX_ERROR,
                    subtype: null,
                    message: e.message,
                }
            });
        }
    },
};

// Helper to validate json schema and perform basic non-null checks
function validate_json_schema(request_body) {
    error_message = null;
    try {
        result = validate(request_body, transaction_validation_schema);
        result.errors.forEach(function (error) {
            if (error_message == null)
                error_message = error.stack;
            else
                error_message += ", " + error.stack;
        });
    } catch (e) {
        error_message = "invalid json format";
    }

    return error_message;
}

// Create operations array for sending payload to tezos blockchain
// It will return null if fails to create
async function create_operations(transactions) {
    try {
        var operations = [];
        await transactions.forEach(async function (transaction) {
            operations.push({
                kind: 'transaction',
                fee: parseInt(transaction.fee),
                gas_limit: parseInt(transaction.gas_limit),
                storage_limit: 300,
                amount: parseInt(transaction.amount),
                destination: transaction.receiver,
            });

        });

        return operations;
    } catch (e) {
        return null
    }
}

// We want to convert the tezos error message to a user friendly message. In most cases we just return back a fixed string.
// In the case that no mapping is found, we will log the error and retrun a generic failure message
function create_error_message(app, blockchain_error, key) {
    // default messsage
    error_messsage = "Unexpected network failure - please try again shortly.";
    is_error_message_changed = false;

    // if no error messsage
    if (typeof blockchain_error == 'undefined')
        return error_messsage

    error_map['errors'].forEach(error => {
        if (blockchain_error.id.includes(error.type)) {
            error_messsage = render(error.message, { blockchain_error, key })
            is_error_message_changed = true;
        }
    });

    // We have no handler for this error so we need to log it so we can consider it afterwards (to add to error_map.yml)
    if (!is_error_message_changed) {
        app.log.error(`tezos error : [${JSON.stringify(blockchain_error)}]`);
    }

    return error_messsage;
}

function extract_error_type(blockchain_error) {
    // default type
    error_type = "Unknown type";

    // if no error messsage
    if (typeof blockchain_error == 'undefined')
        return error_type

    // split on ., take last 2 items, then join again (ie contract.balance_too_low)
    words = blockchain_error.id.split('.');
    words = words.slice((words.length - 2), words.length);
    error_type = words[0] + "." + words[1];

    return error_type;
}