Планирование WEB-приложения 
Требования к приложению:

1. Регистрация учетных записей пользователей, процедуры входа и выхода.
2. Возможность публикации сообщений (записей).
3. Просмотр записей.
4. Простой REST API с поддержкой аутентификации.

   Для этого необходимо организовать хранение данных и обработку данных при
   аутентификации.
   Также следует предусмотреть проверку данных, введенных пользователем.

   Необходимые маршруты выглядят так:

   О маршруты API;
   О GET /api/entries: получение списка записей;
   О POST /api/entry: создание новой записи;

   О маршруты пользовательского интерфейса;
   О GET /post: форма для новой записи;
   О POST /post: публикация новой записи;
   О GET /register: вывод формы регистрации;
   О POST /register: создание новой учетной записи;
   О GET /login: вывод формы входа;
   О POST /login: вход пользователя в приложение;
   О GET /logout: выход пользователя из приложения.

Такая структура типична для большинства веб-приложений.
Возможно, вы сможете использовать пример  как образец для построения ваших будущих приложений.
