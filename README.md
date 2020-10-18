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

Before execute the command you should complete this fields in `/docker/local/env`
```
NEUTINOAPI_USER=<user_id>
NEUTINOAPI_API_KEY=<api-key>
```

```bash
$ npm run docker:local:up
```

### Debug project

With VSCode you can debug de project launched with docker just press `F5` after launch the container

## Launching test (docker)
```bash
$ npm run docker:test
```

## Documentation
### Swagger
After launch the project you access to http://localhost:3000/api