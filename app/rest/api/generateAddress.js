// Load libs
const render = require('es6-template-render');
const { cryptoUtils } = require('sotez');
const { createHash } = require("crypto");

// Load files
const { KEYCHAIN } = require('../../../constants');

module.exports = {
    /**
     * @swagger
     * /tezos-integration/generate-address:
     *   post:
     *     summary: Generate/Re-Generate an Address from private key.
     *     description:
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *                  private_key:
     *                      type: string
     *                      description: (optional) 64 character long hex string, all lowercase
     *                      example: "2267eeff3af4394e574bae8b86763ef95f5e1c22f68cc2636ab1b026b72f5300"
     *     responses:
     *       200:
     *         description: Response Keys.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 private:
     *                   type: string
     *                 public:
     *                   type: string
     *                 address:
     *                   type: string
     */
    generateAddress: async function (app, req, res) {
        // Validate key if provided
        if (req.body.private_key !== undefined && req.body.private_key !== null) {
            if (req.body.private_key.length !== 64) {
                return res.status(400).send({
                    status: 1,
                    message: "Invalid key supplied",
                    result: null,
                });
            }
            if (req.body.private_key !== req.body.private_key.toLowerCase()) {
                return res.status(400).send({
                    status: 2,
                    message: "Invalid key supplied",
                    result: null,
                });
            }
        }

        // Grab the mnemonic(key) if provided
        var mnemonic = req.body.private_key || null;

        // Generate new mnemonic if not provided
        if (mnemonic === null) {
            // Hash the newly generated mnemonic and use that as mnemonic to
            // make Quanta compatible with it's shards's fixed specification
            mnemonic = createHash('sha256')
                .update(cryptoUtils.generateMnemonic())
                .digest('hex');
        }

        // Generate key-pairs from mnemonic
        const keys = await cryptoUtils.generateKeys(mnemonic.toLowerCase());

        return res.send({
            private: mnemonic,
            public: keys.pk,
            address: keys.pkh,
        });
    },
};
