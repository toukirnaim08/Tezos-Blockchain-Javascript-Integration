const request = require("supertest");
const app = require("../app");

// Test re-generate an address from PK
test("1", async () => {
    const url = "/tezos-integration/generate-address";
    const body = {
        key: "2267eeff3af4394e574bae8b86763ef95f5e1c22f68cc2636ab1b026b72f5300",
    };

    return request(app)
        .post(url)
        .send(body)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(200);

            // Validate the response
            expect(response.body.private).toBe("2267eeff3af4394e574bae8b86763ef95f5e1c22f68cc2636ab1b026b72f5300");
            expect(response.body.public).toBe("edpkvWJTtaAcA4DURo7Ezf41gQGwCRHnbpFn5Lx4XmFpmBN548QHGU");
            expect(response.body.address).toBe("tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s");
        });
});

// Test generate random address
test("2", async () => {
    const url = "/tezos-integration/generate-address";

    return request(app)
        .post(url)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(200);

            // Validate the response
            expect(response.body.private).toHaveLength(64);
            expect(response.body.public).toHaveLength(54);
            expect(response.body.address).toHaveLength(36);

            // Validate the response if it's returning static data or not
            expect(response.body.private).not.toBe("2267eeff3af4394e574bae8b86763ef95f5e1c22f68cc2636ab1b026b72f5300");
            expect(response.body.public).not.toBe("edpkvWJTtaAcA4DURo7Ezf41gQGwCRHnbpFn5Lx4XmFpmBN548QHGU");
            expect(response.body.address).not.toBe("tz1fUkF4BXdJ2r4H8AKY1ehQqif2WNGyqx7s");
        });
});

// Test generate random address
test("3", async () => {
    const url = "/tezos-integration/generate-address";
    const body = {
        key: "67eeff3af4394e574bae8b86763ef95f5e1c22f68cc2636ab1b026b72f5300",
    };

    return request(app)
        .post(url)
        .send(body)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(400);
        });
});

// Test generate random address
test("4", async () => {
    const url = "/tezos-integration/generate-address";
    const body = {
        key: "2267EEFF3AF4394E574BAE8B86763EF95F5E1C22F68CC2636AB1B026B72F5300",
    };

    return request(app)
        .post(url)
        .send(body)
        .then(response => {
            // Validate if we have valid response
            expect(response.statusCode).toBe(400);
        });
});