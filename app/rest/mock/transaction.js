const fetch = require('node-fetch');
const { projectTitle } = require('../../../constants');

module.exports = {
    handler: async (app, req, res) => {
        const request_path = req.path.replace(projectTitle.NAME + '/mock/node', '');
        var expected_payload = null;
        // Handle the request
        switch (req.method + request_path) {
            case "GET/chains/main/blocks/head/header":
                return res
                    .send({ "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A", "chain_id": "NetXdQprcVkpaWU", "hash": "BKpiGL9PZsNGqMiex7bAKiS8NjCavNYwxicciQWaBezvY4Hra4t", "level": 2298423, "proto": 12, "predecessor": "BLKbvpfhjwFt2vTxWFEHbjRf4LdcfEjsiTdftpEBkbrMunNBVHk", "timestamp": "2022-04-21T00:32:44Z", "validation_pass": 4, "operations_hash": "LLoaQsJwVveSXqAVHg9CgxVe4cJ2ChCKxmjRJYcS7AfpeeWQjwD68", "fitness": ["02", "00231237", "", "ffffffff", "00000000"], "context": "CoV14gweYikebwoopTDJt8H5uHhswexiMVSx1ufLV1YcckNFTSL7", "payload_hash": "vh1qnpEDYasSQTWLYUxv8oUcUMzPCb6EbyiBUuFnqtTEh6ggkEqG", "payload_round": 0, "proof_of_work_nonce": "6e2037c963e30200", "liquidity_baking_escape_vote": false, "signature": "sigWtKgarzr9sr3iJSQ171x3dFHTGtkQkrJdwVnTWRLzJVJSAMcaSVaJrAsb2VF8vrnsNnTWhkbEJGS8i1jj7LKXZv1yKjqa" })

            case "GET/chains/main/blocks/head/metadata":
                return res
                    .send({ "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A", "next_protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A", "test_chain_status": { "status": "not_running" }, "max_operations_ttl": 120, "max_operation_data_length": 32768, "max_block_header_length": 289, "max_operation_list_length": [{ "max_size": 4194304, "max_op": 2048 }, { "max_size": 32768 }, { "max_size": 135168, "max_op": 132 }, { "max_size": 524288 }], "proposer": "tz1S8MNvuFEUsWgjHvi3AxibRBf388NhT1q2", "baker": "tz1S8MNvuFEUsWgjHvi3AxibRBf388NhT1q2", "level_info": { "level": 2298463, "level_position": 2298462, "cycle": 474, "cycle_position": 4702, "expected_commitment": false }, "voting_period_info": { "voting_period": { "index": 70, "kind": "proposal", "start_position": 2285568 }, "position": 12894, "remaining": 28065 }, "nonce_hash": null, "consumed_gas": "187496000", "deactivated": [], "balance_updates": [{ "kind": "accumulator", "category": "block fees", "change": "-30105", "origin": "block" }, { "kind": "minted", "category": "baking rewards", "change": "-10000000", "origin": "block" }, { "kind": "contract", "contract": "tz1S8MNvuFEUsWgjHvi3AxibRBf388NhT1q2", "change": "10030105", "origin": "block" }, { "kind": "minted", "category": "baking bonuses", "change": "-9116322", "origin": "block" }, { "kind": "contract", "contract": "tz1S8MNvuFEUsWgjHvi3AxibRBf388NhT1q2", "change": "9116322", "origin": "block" }], "liquidity_baking_escape_ema": 117835, "implicit_operations_results": [{ "kind": "transaction", "storage": [{ "int": "29332947185" }, { "int": "3860551442332" }, { "int": "265303438" }, { "bytes": "01a3d0f58d8964bd1b37fb0a0c197b38cf46608d4900" }, { "bytes": "0115eb0104481a6d7921160bc982c5e0a561cd8a3a00" }], "balance_updates": [{ "kind": "minted", "category": "subsidy", "change": "-2500000", "origin": "subsidy" }, { "kind": "contract", "contract": "KT1TxqZ8QtKvLu3V3JH7Gx58n7Co8pgtpQU5", "change": "2500000", "origin": "subsidy" }], "consumed_gas": "225", "consumed_milligas": "224259", "storage_size": "4641" }] })

            case "GET/chains/main/blocks/head/context/contracts/tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s/manager_key":
                return res
                    .send(null)

            case "GET/chains/main/blocks/head/context/contracts/tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s/counter":
                return res
                    .send("59158397")

            case "POST/chains/main/blocks/head/helpers/preapply/operations":
                expected_payload = [{ "branch": "BKpiGL9PZsNGqMiex7bAKiS8NjCavNYwxicciQWaBezvY4Hra4t", "contents": [{ "kind": "reveal", "fee": "1420", "public_key": "edpkvWJTtaAcA4DURo7Ezf41gQGwCRHnbpFn5Lx4XmFpmBN548QHGU", "source": "tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s", "gas_limit": "10600", "storage_limit": "300", "counter": "59158398" }, { "kind": "transaction", "fee": "1420", "gas_limit": "10600", "storage_limit": "300", "amount": "1", "destination": "tz1bpC9FCqHDmj6Zr5ULH1mcnvtBKho9ZFPM", "source": "tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s", "counter": "59158399" }], "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A", "signature": "edsigtzJqyKX1QByTUfZM2Wr3yLFYu2krVRFWi6fbrTEHFFK7n3MuyyZMi4aWdmR15q2wYjFR74vAcgEdwdoBdqgQTXjR1XMKki" }];
                if (JSON.stringify(req.body) === JSON.stringify(expected_payload)) {
                    return res
                        .send([{ "contents": [{ "kind": "transaction", "source": "tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s", "fee": "1420", "counter": "13047469", "gas_limit": "10600", "storage_limit": "300", "amount": "1", "destination": "tz1bpC9FCqHDmj6Zr5ULH1mcnvtBKho9ZFPM", "metadata": { "balance_updates": [{ "kind": "contract", "contract": "tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s", "change": "-1420", "origin": "block" }, { "kind": "accumulator", "category": "block fees", "change": "1420", "origin": "block" }], "operation_result": { "status": "applied", "balance_updates": [{ "kind": "contract", "contract": "tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s", "change": "-1", "origin": "block" }, { "kind": "contract", "contract": "tz1bpC9FCqHDmj6Zr5ULH1mcnvtBKho9ZFPM", "change": "1", "origin": "block" }], "consumed_gas": "1421", "consumed_milligas": "1420040" } } }], "signature": "edsigtYofLadxUa2ECgCpdVqpn3UdCXTxC1GWEt5JhCG6nZviUiFfJXAvwM7zDZCN7N8MJTB4EKJPsgXbvtKwTeZ4zBFujeefgf" }])
                }

                console.debug(`400 /chains/main/blocks/head/helpers/preapply/operations '${JSON.stringify(expected_payload)}' != '${JSON.stringify(req.body)}'`)
                return res.status(400).send('Bad data');

            case "POST/injection/operation":
                expected_payload = "0e99855f06b6bfe3cbae4f863afe12141746eb82b852035a53c490d27a2cc0ce6b00d9a10a704b51abd52ad8c07b68dc26e086e1f3f68c0bfede9a1ce852ac0200f5678a9e325d5f2445eae1309c8c0f235465017ff31051aa3737bfdf2ba997cf6c00d9a10a704b51abd52ad8c07b68dc26e086e1f3f68c0bffde9a1ce852ac02010000b16e0f9de0954e553c6fa58d30b38ef1242078f100ca90f1b40212e8ff0799c79e83eabd43e6a343eccb963eff7522594c2a2d2969a34abdf19c5985ec860abd99420fe739f9d95b37d48af51e57ebbefe64da2906";
                if (JSON.stringify(req.body) === JSON.stringify(expected_payload)) {
                    return res
                        .send("onzXEzuigrHW8NCFndiUJxeME58HSs6tr6LBbjwPSKuiouZ9Mpc")
                }

                console.debug(`400 /injection/operation`)
                return res.status(400).send('Bad data');
        }

        console.debug("404");

        // Handle 404
        return res.status(404).send('404');
    }
}
