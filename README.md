# Unido Core - Tezos Tx service
Unido Tezos Tx service.<br />
This is a service for handling tezos transactions for unido<br />
The server is hosted on localhost 5150

## Steps to run before pushing to GIT
```bash
# Step 1: Perform all the tests
npm test
```

---
#### Build & Push:
```bash
./run_docker_build_prod.sh
```

---
### Dev Env:
```bash
# step 1 clone the repo
git clone git@bitbucket.org:worldwebgroup/unido-tezos-tx-service.git
cd unido-tezos-tx-service

# step 2 configure the .env file
ln -s .env.dev .env

# step 3 install dependencies
npm install

# step 4 run the dev server
npm start

```

---
## Swagger UI URL
```
/unido-tezos-tx-service/pages/apidocs
```