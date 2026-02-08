# Контракт API (бэкенд на localhost:3001)

Фронтенд ожидает следующие эндпоинты. Базовый URL: `http://localhost:3001` (или `NEXT_PUBLIC_API_URL`).

## Товары

- **GET /api/products** — список товаров. Ответ: массив объектов:
  ```json
  [{ "id": 1, "name": "...", "price": "2 400,00", "priceNum": 2400, "image": "/slider/slide1.png", "category": "female|male|unisex", "brand": "...", "featured": false }]
  ```

- **GET /api/volumes** (опционально) — массив объёмов, например `[10, 30, 50, 100]`. Если нет — фронт использует константу.

## Авторизация

- **POST /api/auth/register** — тело: `{ "email": "...", "password": "...", "gender": "female|male|unisex" }`. Ответ: `{ "user": { "id", "email", "name?", ... }, "token": "..." }`. Токен сохраняется на клиенте и отправляется в заголовке `Authorization: Bearer <token>`.

- **POST /api/auth/login** — тело: `{ "email": "...", "password": "..." }`. Ответ: `{ "user": {...}, "token": "..." }`.

- **GET /api/auth/me** — заголовок `Authorization: Bearer <token>`. Ответ: `{ "user": {...} }` или просто объект пользователя.

- **POST /api/auth/logout** (опционально) — инвалидация сессии на бэке.

## Профиль (CRUD)

- **GET /api/profile** — текущий профиль пользователя (по токену). Ответ: `{ "name", "phone", "address", ... }`.

- **PUT /api/profile** — тело: `{ "name", "phone", "address" }`. Обновление профиля.

## Корзина (для авторизованного пользователя)

- **GET /api/cart** — корзина пользователя. Ответ: массив `items` или сам массив:
  ```json
  [{ "id": "itemId", "productId": 1, "name": "...", "price": "...", "priceNum": 2400, "image": "...", "volume": 30 }]
  ```

- **POST /api/cart** — тело: `{ "productId", "name", "price", "priceNum", "image", "volume" }`. Добавить в корзину.

- **DELETE /api/cart/:itemId** — удалить позицию из корзины (`itemId` — id элемента корзины).

---

Для работы без бэкенда: товары подставляются из статичного списка при ошибке запроса; корзина гостя хранится в localStorage.
