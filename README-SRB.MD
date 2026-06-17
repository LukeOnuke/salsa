# SALSA - Serviced Automatic Log Sorting Application

*(Сервисна апликација за аутоматско сортирање логова)*

Приватно претражујте хиљаде лог порука (log messages) широм ваше инфраструктуре у реалном времену, док сви ваши приватни подаци остају унутар ваше мреже. Категоризује долазне лог поруке помоћу локалних, *self-hosted* LLM модела. Тренутно је прилагођено за LLAMA моделе. Идеја за будућност, уколико пројекат привуче пажњу, јесте тренирање ефикаснијег модела за категоризацију логова уз мање хардверске захтеве.

## Подешавање (Setup)

Да би SALSA функционисала, биће вам потребно:

* рачунар са приступом мрежи опремљен графичком картицом (GPU)
* Bun / Node.js
* Ollama
* MySQL

### Предуслов 1 - Bun / Node

Вероватно већ имате инсталиран Bun на свом рачунару/серверу, а ако немате: изгуглајте. Није толико тешко.

### Предуслов 2 - Ollama

За ово ће вам бити потребна Ollama. Упутство за инсталацију можете пронаћи на [Ollama страници за преузимање](https://ollama.com/download).

Након што инсталирате Ollama-у, потребно је да преузмете модел који SALSA користи.

```bash
ollama run qwen3:0.6b

```

### Предуслов 3 - MySQL

Инсталација MySQL-а на серверу или рачунару превазилази оквире овог Markdown документа, али на интернету постоје одлични извори за то. Ако ништа друго, питајте ваш омиљени LLM.

Пример `.env` фајла:

```env
SERVER_PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_NAME=salsa
JWT_SECRET=25b6d7cb-ca0b-8e0d-8f54-05640ade4d44
JWT_ACCESS_TTL=12s
JWT_REFRESH_TTL=7d

```

---

# API Документација

У наставку се налази комплетна API документација пројекта. Напомена: Иако је лекторисана и дотерана, ***генерисана је помоћу вештачке интелигенције (AI)***.

## Преглед (Overview)

* **Основни URL (Base URL):** `/api`
* **Content-Type:** `application/json`
* **Аутентификација:** Већина рута је заштићена путем JWT-а. Захтеви ка заштићеним рутама морају да садрже хедер: `Authorization: Bearer <token>`.

## Аутентификација и Ауторизација

Апликација користи глобални *middleware* за JWT валидацију.

**Дозвољене руте (Whitelisted - није потребан Bearer токен):**

* `POST /api/user/login`
* `POST /api/user/refresh`
* `POST /api/logentry/digest` *(Користи `x-api-key` хедер уместо токена)*

---

# Дељени Enumi и Модели

**LogLevel Enum:**
Користи се за класификацију озбиљности лог уноса.

* `INFO`
* `WARN`
* `ERROR`
* `FATAL`

---

# 1. Корисници (`/api/user`)

## POST /login

**Аутентификација:** Нема (Whitelisted)

**Тело захтева (Body):** ```json
{
"email": "user@example.com",
"password": "secretpassword"
}

```

Аутентификује корисника и враћа пар токена.

## POST /refresh

**Аутентификација:** Нема (Whitelisted у главном middleware-у)

**Хедер:** `Authorization: Bearer <refresh_token>`

Освежава истекли JWT. Баца `REFRESH_TOKEN_MISSING` грешку уколико токен недостаје у authorization хедеру.

## GET /self

**Аутентификација:** Bearer Токен

Враћа профил тренутно аутентификованог корисника на основу *payload*-а токена, конкретно користећи е-маил кодиран у JWT-у.

---

# 2. Локације (`/api/location`)

**Структура ентитета:**

```json
{
  "locationId": "number",
  "shorthand": "string",
  "address": "string | null",
  "city": "string | null",
  "country": "string | null",
  "deletedAt": "Date"
}

```

## GET /list

Враћа пуну, непагинирану листу свих активних локација у бази података.

## GET /fetch

**Query параметри:** `?page=1&limit=10` *(Подразумевано: page=1, limit=10)*

Враћа пагинирану листу локација на основу прослеђених параметара за лимит и страницу (`limit` и `page`).

## GET /fetch-singular/:id

Дохвата и враћа један ентитет локације који се поклапа са прослеђеним `locationId` *path* параметром.

## PUT /create/

**Тело захтева (Body):** `Location` објекат *(изостављајући `locationId`)*

Креира нови ентитет локације у бази података.

## PUT /update/

**Тело захтева (Body):** `Location` објекат *(мора укључити `locationId`)*

Ажурира постојећу локацију помоћу прослеђених *payload* података.

## DELETE /delete/:id

Ради *soft-delete* (меко брисање) локације преко њеног `locationId` постављањем `deletedAt` *timestamp*-а, чиме се запис задржава нетакнутим ради релационог интегритета.

---

# 3. Сервери (`/api/server`)

**Структура ентитета:**

```json
{
  "serverId": "number",
  "name": "string",
  "locationId": "number",
  "deletedAt": "Date"
}

```

## GET /list

Враћа пуну, непагинирану листу свих активних сервера.

## GET /fetch

**Query параметри:** `?page=1&limit=10`

Враћа пагинирану листу сервера на основу прослеђених параметара за лимит и страницу.

## GET /fetch-singular/:id

Дохвата и враћа један ентитет сервера који се поклапа са прослеђеним `serverId` *path* параметром.

## PUT /create/

**Тело захтева (Body):** `Server` објекат

Креира нови ентитет сервера и успоставља релацију повезивањем са специфичном локацијом.

## PUT /update/

**Тело захтева (Body):** `Server` објекат

Ажурира постојећи сервер помоћу прослеђених *payload* података.

## DELETE /delete/:id

Ради *soft-delete* сервера преко његовог `serverId` постављањем `deletedAt` *timestamp*-а.

---

# 4. Процеси (`/api/process`)

**Структура ентитета:**

```json
{
  "processId": "number",
  "name": "string | null",
  "serverId": "number",
  "secret": "string",
  "deletedAt": "Date"
}

```

*(Напомена: Аутоматски генерисани `secret` је подразумевано искључен из стандардних `SELECT` упита ради сигурности)*

## GET /list

Враћа пуну, непагинирану листу свих активних процеса.

## GET /fetch

**Query параметри:** `?page=1&limit=10`

Враћа пагинирану листу процеса на основу прослеђених параметара за лимит и страницу.

## GET /fetch-singular/:id

Дохвата и враћа један ентитет процеса који се поклапа са прослеђеним `processId` *path* параметром.

## PUT /create/

**Тело захтева (Body):** `Process` објекат

Креира нови процес. Приликом креирања, база података аутоматски генерише сигурни 256-битни хексадецимални `secret` који се користи за аутентификацију помоћу API кључа.

## PUT /update/

**Тело захтева (Body):** `Process` објекат

Ажурира постојећи процес помоћу прослеђених *payload* података.

## DELETE /delete/:id

Ради *soft-delete* процеса преко његовог `processId` постављањем `deletedAt` *timestamp*-а.

---

# 5. Лог уноси (`/api/logentry`)

**Структура ентитета:**

```json
{
  "logEntryId": "number",
  "content": "string",
  "isImportant": "boolean",
  "importance": "number",
  "severity": "INFO | WARN | ERROR | FATAL",
  "createdAt": "Date",
  "deletedAt": "Date",
  "processId": "number"
}

```

## POST /digest

**Аутентификација:** API кључ *(Whitelisted из глобалног JWT-а)* **Хедери:** `x-api-key: <process_secret>`

**Тело захтева (Body):** 
```json
{
"content": "Description of the event",
"time": "2026-06-17T11:00:00.000Z",
"processId": 123
}
```

Уноси нови лог запис у систем. Ова рута аутентификује захтев провером да ли се прослеђени `x-api-key` хедер поклапа са генерисаним `secret`-ом који припада прослеђеном `processId`-ју. Баца `NOT_FOUND` грешку уколико аутентификација не успе или ако наведени процес не постоји.

## GET /fetch

**Query параметри:** `?page=1&limit=10`

Враћа пагинирану листу лог уноса на основу прослеђених параметара за лимит и страницу.

## GET /fetch-singular/:id

Дохвата и враћа један лог унос који се поклапа са прослеђеним `logEntryId` *path* параметром.

## PUT /update/

**Тело захтева (Body):** `LogEntry` објекат

Ажурира постојећи лог унос помоћу прослеђених *payload* података.

## DELETE /delete/:id

Ради *soft-delete* лог уноса преко његовог `logEntryId` постављањем `deletedAt` *timestamp*-а.
