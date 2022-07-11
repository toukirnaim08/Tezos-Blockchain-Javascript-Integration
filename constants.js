exports.projectTitle = {
    NAME: "/tezos-integration",
};

exports.defaultConfig = {
    port: 9001
}

exports.KEYCHAIN = {
    // tezos APIs
    tezos: {
        nodeUrl1: "https://mainnet-tezos.giganode.io",
        nodeUrl2: 'https://mainnet.smartpy.io',
        nodeUrl3: 'https://rpc.tzbeta.net',
        nodeUrl4: 'https://api.tez.ie/rpc/mainnet',
        nodeUrl5: 'https://teznode.letzbake.com',
        nodeUrl6: 'https://testnet-tezos.giganode.io',
        nodeUrl7: 'https://rpcalpha.tzbeta.net',

        mockNodeUrl: 'http://127.0.0.1:5000/tezos-service/mock/node',
    }
};

exports.errorTypes = {
    // error APIs
    BLOCKCHAIN_ERROR: "BLOCKCHAIN ERROR",
    SYNTAX_ERROR: "SYNTAX ERROR",
    INVALID_PAYLOAD: "INVALID PAYLOAD"
};