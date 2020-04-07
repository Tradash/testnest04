
## Описание

Тестовое задание
текс задания см task.md

Реализовано на Nestjs,<br>
БД для хранения данных - PostGis <br>
БД для кеширования запросов - Redis<br>
Обмен данными между нодами сервиса через NATS<br>
Описание HTTP API доступно по роуту /api <br>

Для запуска необходимы следующие внешние сервисы:
- Сервис с БД PostGis
- Сервис с БД Redis
- Сервис обмена сообщений NATS 

## Установка

$ git clone https://github.com/Tradash/nestjs_test.git
$ cd nestjs_test
$ npm install

## Настройка окружения. Установка переменных окружения
##### Переменный для Настройки сервиса
HTTP порт сервиса
```
PORT=3002
```
##### Переменные для Настройки postgis
- Адрес хоста сервара БД
```
POSTGRES_HOST = 127.0.0.1
```
- Порт сервера БД
```
POSTGRES_PORT = 5432
```
- Логин для подключения к БД
``` 
POSTGRES_USER=postgres
```
- Пароль для логина
```
POSTGRES_PASSWORD=admin
```
- Название базы данных
```
POSTGRES_DATABASE=postgis_30_sample
```
- Режима логирования запросов к БД (True)
```
TYPEORM_LOGGING=false
```
- Создавать таблицу с данными в БД, при ее отсутсвии.
```
CREATE_NEWTABLE=true - 
```

#### Переменные для настройки Редиса для кэширования
- Адрес сервера Redis
```
REDIS_HOST=127.0.0.1
```
- Порт сервера Redis
```
REDIS_PORT=6379
```
- Время хранения данных в кэше, в секундах
``` 
REDIS_TTL=10
```
- Максимальное количество записей единовременно хранимых в кеше
```
REDIS_MAX_ITEM=30
```

#### Переменные для настройки NATS
- Адрес сервера NATS
```
NATS_HOST = localhost
```
- Порт сервиса
```
NATS_PORT = 4222
```

Запуск приложения
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
