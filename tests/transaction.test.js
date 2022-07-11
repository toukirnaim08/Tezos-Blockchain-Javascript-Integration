const request = require("supertest");
const app = require("../app");

// Test transfer
test("1", () => {
    expect(true);
    const url = "/tezos-integration/transfer";
    const body = {
        sender: "tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s",
        private_key: "2267eeff3af4394e574bae8b86763ef95f5e1c22f68cc2636ab1b026b72f5300",
        transactions: [{
            fee: 1420,
            gas_limit: 10600,
            amount: 1,
            receiver: "tz1bpC9FCqHDmj6Zr5ULH1mcnvtBKho9ZFPM",
        }]
    };

    return request(app)
        .post(url)
        .send(body)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(400);
        });
});
