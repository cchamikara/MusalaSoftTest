# Musala test

> Device gateway manager with ExpressJs and MongoDB.

# Discussion
* I've used sub document pattern instead of references to store devices as number of devices limited to 10
* for FE I'm using NextJs
* used TailWind CSS for styling

# Setup

* Installing dependencies

```bash
$ yarn
```

# Docker

* Building an image

```bash
$ docker-compose build
```

* Running a container

```bash
$ docker-compose up
```

* Stopping a container

```bash
$ docker-compose down
```

* Running test cases

Test cases include below scenarios
* ✓ creating a new gateway with 10 devices
* ✓ creating a new gateway with 11 devices should return error
* ✓ adding device to existing gateway
* ✓ adding 11th device to existing gateway, should return an error
* ✓ removing device from a gateway

```bash
$ cd backend
$ yarn test
```

* Running Frontend (I was only able to complete data fetching part of the FE so didn't dockerized it)

```bash
$ cd frontend
$ yarn install
$ yarn dev
```
Please use postman collection to add/remove devices or gateways

# Rest API

### User Service

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| GET    | /api/gateways            | Retrieves a list of gateways |
| POST   | /api/gateways            | Create new gateway           |
| GET    | /api/gateways/:id        | Get Gateway by id            |
| PUT    | /api/gateways/:id/device | Add new device to gateway    |
| DELETE | /api/gateways/:id/device | Deletes device from gateway  |

# Postman collection

* postman/device-gateway.postman_collection.json

# Author

[Chamal Chamikara](https://www.chamalchamikara.com)
