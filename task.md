Необходимо реализовать простейший реестр точек интереса. 

Необходимо реализовать 2 сервиса
1.	Сервис - HTTP апи, реализующее следующие методы:
a.	Запрос ближайших объектов: в запросе передается текущее местоположение (широта и долгота), максимальное количество точек в выборке и максимальная удаленность (метры)
b.	Добавление нового объекта: геопозиция (широта, долгота), название
c.	Изменение существующего объекта: геопозиция, название.
2.	Сервис управления объектами, реализующий след. API:
a.	запрос списка объектов с возможностью фильтрации по всем параметра и сортировкой по условию;
b.	создание нового объекта;
c.	изменение объекта.

Общие требования:
●	Все данные хранятся в реляционной БД.
●	1 сервис реализует только HTTP интерфейс, непосредственного доступа к БД он не имеет. Реализует краткосрочное кеширование.
●	2 сервис реализует функции управления сущностями в БД.
●	общение 1 и 2 сервисов происходит с использованием любой имплементации RPC-подобного протокола (очереди, WebSockets, TCP).
●	Управление сущностями должно осуществляться через любую ORM.
●	Информация о геопозиции должна быть представлена в формате GeoJSON.
●	Передача всех параметров в сервисы через переменные окружения: конфигурация канала обмена данными между сервисами, продолжительность жизни кэша, конфигурация БД, и т.д.
●	Инструкции по запуску проекта.
●	Репозиторий на GitLab(предпочтительно)/GitHub.

Будет плюсом:
●	HTTP API должен быть описан в соответствие со стандартом OpenAPI.
●	Комментирование кода в формате JsDoc.
●	соответствие https://12factor.net/.
●	Использование TypeScript.

Рекомендации по технологиям (использование на усмотрение претендента):
●	БД - PostGIS, Postgres, Redis;
●	Кеширование - Redis;
●	Обмен сообщениями - Bull(Redis), RabbitMQ, Nats;
●	Nest.js
●	TypeORM.
