exports.transaction_validation_schema = {
    "type": "object",
    "properties": {
        "sender": {
            "type": "string",
            "pattern": "^(tezos:)?(tz1|tz2|tz3|KT1)[a-zA-Z0-9]{33}$",
            "minLength": 10
        },
        "private_key": {
            "type": "string",
            "minLength": 20
        },
        "transactions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "fee": {
                        "type": "number"
                    },
                    "gas_limit": {
                        "type": "number"
                    },
                    "amount": {
                        "type": "number"
                    },
                    "receiver": {
                        "type": "string",
                        "pattern": "^(tezos:)?(tz1|tz2|tz3|KT1)[a-zA-Z0-9]{33}$",
                        "minLength": 10
                    }
                },
                "required": ["fee", "gas_limit", "amount", "receiver"],
                "additionalProperties": false
            },
            "minItems": 1
        },
    },
    "required": ["sender", "private_key", "transactions"],
    "additionalProperties": false
};

// sawgger schema

/**
 * @swagger
 * components:
 *   schemas:
 *     tezos_operation:
 *       type: object
 *       properties:
 *         fee:
 *           type: number
 *           description: fee
 *           example: 1420
 *         gas_limit:
 *           type: number
 *           description: gas limit
 *           example: 10600
 *         amount:
 *           type: number
 *           description: amount transfered in unscaled version
 *           example: 1
 *         receiver:
 *           type: string
 *           description: target address
 *           example: tz1UpohqEA6o2y72FgqZDjwMaVvE9c41X6Vi
 * 
 *     error:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: The type of error.
 *           example: INVALID PAYLOAD
 *         subtype:
 *           type: string
 *           description: The sub-type of error.
 *           example: contract.balance_too_low
 *         message:
 *           type: string
 *           description: error message.
 *           example: A transaction tried to exceed the hard limit on gas.
 */