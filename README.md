
## Описание

Тестовое задание
текс задания см task.md

Реализовано на Nestjs,
БД для хранения данных - PostGis
БД для кеширования запросов - Redis
Обмен данными между нодами сервиса через NATS

## Installation


$ git clone https://github.com/Tradash/nestjs_test.git
$ cd nestjs_test
$ npm install

## Running the app

### 1. Установка переменных окружения
##### Настройки сервиса
PORT=3002

##### Настройки postgis
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_DATABASE=postgis_30_sample
MODE=DEV
RUN_MIGRATIONS=true

##### Настройки Редиса для кэширования
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_TTL=10
REDIS_MAX_ITEM=20

##### Настройки NATS
NATS_HOST = localhost
NATS_PORT = 4222


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
