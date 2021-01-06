# td4eserver

Самообразовательный проект.
Серверную часть для ToDo-листа todoeeee.

Особенности:
1. максимально чистая node.js;
2. БД - mongodb, ORM - mongoose;
3. инверсия зависимостей;
4. внедрение зависимостей;
5. sandboxing, исполнение методов api в изолированном окружении через vm.createContext() и vm.runInContext();
6. создан Dockerfile для быстрого развертывания сервера;
7. аутентификация по логину/паролю, токены/сессии. Реализовано не полностью, еще нет хеширования паролей и генерирования UUID.

Осмысление "Чистой архитектуры".

Планы:
1. создание средства конфигурации;
2. работа с mongodb без ORM;
3. опробовать postgres, redis;
4. опробовать в качестве транспорта websocket;
5. сделать версию на express;
6. сделать версию на nest.js.
