# Bnext technical prove

## Local Requirements

- You should have credentials in [neutrino](https://www.neutrinoapi.com/)

### Deploy with docker

- Docker version 19.03.0 or higher
- (Optional if you want to make local development) NodeJS v12.18.3

### Deploy without docker

- NodeJS v12.18.3
- Maria DB 10.5.3

## Launching project (docker)
```bash
$ npm run docker:local:up
```

## Launching test (docker)
```bash
$ npm run docker:test
```

## Documentation
### Swagger
After launch the project you access to http://localhost:3000/api