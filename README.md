# SALSA - Serviced Automatic Log Sorting Aplication
> [!NOTE]
> За пројектну документацију на спрском, посетите маркдаун документ `README-SRB.MD`.

Privatly sift through thausands of log messages across your entire infrastructure in real time whilst keeping all your private data in your network. Categorises incomming log messages with local self hosted LLM models. Currently tooled for LLAMA. Future idea if it gets attention is to train a efficient model to categorise logs with less hardware cost.

## Setup
For SALSA to function you will need:
- a network capable computer equiped with a GPU
- bun/node
- ollama
- mysql

### Prerequisites 1 - bun/node
You already have bun on your pc/server, or if you dont: google it. Not that 
hard.

### Prerequisites 2 - ollama
You will need ollama for this, you can find the instalation guide on 
[ollamas download page](https://ollama.com/download).

After you have installed ollama, you need to download the model that salsa uses.
```bash
ollama run qwen3:0.6b
```

### Prerequisites 3 - mysql
Installing mysql on a server or pc is beyond the scope of this markdown 
document, but there are great sources online for it. If nothing else ask your 
LLM of choice.

Example `.env`
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


# API Documentation

The following is the full api documentation of the project. Disclamer: Although it was proofread and retouched, *__it was ai generated__*.

## Overview

* **Base URL:** `/api`
* **Content-Type:** `application/json`
* **Authentication:** Most routes are secured via JWT. Requests to secured routes must include the header: `Authorization: Bearer <token>`.

## Authentication & Authorization

The application uses a global JWT validation middleware.

**Whitelisted Routes (No Bearer Token Required):**

* `POST /api/user/login`
* `POST /api/user/refresh`
* `POST /api/logentry/digest` *(Uses `x-api-key` header instead)*

---

# Shared Enums & Models

**LogLevel Enum:**
Used to classify the severity of log entries.

* `INFO`
* `WARN`
* `ERROR`
* `FATAL`

---

# 1. Users (`/api/user`)

## POST /login

**Auth:** None (Whitelisted)

**Body:** 
```json
{ 
    "email": "user@example.com",
    "password": "secretpassword" 
}
```

Authenticates a user and returns a token pair.

## POST /refresh

**Auth:** None (Whitelisted from main middleware)

**Header:** `Authorization: Bearer <refresh_token>`

Refreshes an expired JWT. Throws a `REFRESH_TOKEN_MISSING` error if the token is absent from the authorization header.

## GET /self

**Auth:** Bearer Token

Returns the currently authenticated user's profile based on the token payload, specifically using the email encoded in the JWT.

---

# 2. Locations (`/api/location`)

**Entity Structure:**

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

Returns a full, unpaginated list of all active locations in the database.

## GET /fetch

**Query Params:** `?page=1&limit=10` *(Defaults: page=1, limit=10)*

Returns a paginated list of locations based on the provided limit and page parameters.

## GET /fetch-singular/:id

Fetches and returns a single location entity matching the provided `locationId` path parameter.

## PUT /create/

**Body:** Location object *(omitting `locationId`)*

Creates a new location entity in the database.

## PUT /update/

**Body:** Location object *(must include `locationId`)*

Updates an existing location with the provided payload data.

## DELETE /delete/:id

Soft-deletes a location by its `locationId` by setting the `deletedAt` timestamp, keeping the record intact for relational integrity.

---

# 3. Servers (`/api/server`)

**Entity Structure:**

```json
{
  "serverId": "number",
  "name": "string",
  "locationId": "number",
  "deletedAt": "Date"
}

```

## GET /list

Returns a full, unpaginated list of all active servers.

## GET /fetch

**Query Params:** `?page=1&limit=10`

Returns a paginated list of servers based on the provided limit and page parameters.

## GET /fetch-singular/:id

Fetches and returns a single server entity matching the provided `serverId` path parameter.

## PUT /create/

**Body:** Server object

Creates a new server entity and establishes a relationship by linking it to a specific Location.

## PUT /update/

**Body:** Server object

Updates an existing server with the provided payload data.

## DELETE /delete/:id

Soft-deletes a server by its `serverId` by setting the `deletedAt` timestamp.

---

# 4. Processes (`/api/process`)

**Entity Structure:**

```json
{
  "processId": "number",
  "name": "string | null",
  "serverId": "number",
  "secret": "string",
  "deletedAt": "Date"
}

```

*(Note: The auto-generated `secret` is excluded from standard `SELECT` queries by default to ensure security)*

## GET /list

Returns a full, unpaginated list of all active processes.

## GET /fetch

**Query Params:** `?page=1&limit=10`

Returns a paginated list of processes based on the provided limit and page parameters.

## GET /fetch-singular/:id

Fetches and returns a single process entity matching the provided `processId` path parameter.

## PUT /create/

**Body:** Process object

Creates a new process. Upon creation, the database auto-generates a secure 256-bit hex `secret` which is used for API key authentication.

## PUT /update/

**Body:** Process object

Updates an existing process with the provided payload data.

## DELETE /delete/:id

Soft-deletes a process by its `processId` by setting the `deletedAt` timestamp.

---

# 5. Log Entries (`/api/logentry`)

**Entity Structure:**

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

**Auth:** API Key Authentication *(Whitelisted from global JWT)* **Headers:** `x-api-key: <process_secret>`

**Body:** 
```json
{
"content": "Description of the event",
"time": "2026-06-17T11:00:00.000Z",
"processId": 123
}
```

Ingests a new log entry into the system. This route authenticates the request by verifying that the provided `x-api-key` header matches the generated `secret` belonging to the provided `processId`. It throws a `NOT_FOUND` error if the authentication fails or if the specified process does not exist.

## GET /fetch

**Query Params:** `?page=1&limit=10`

Returns a paginated list of log entries based on the provided limit and page parameters.

## GET /fetch-singular/:id

Fetches and returns a single log entry matching the provided `logEntryId` path parameter.

## PUT /update/

**Body:** LogEntry object

Updates an existing log entry with the provided payload data.

## DELETE /delete/:id

Soft-deletes a log entry by its `logEntryId` by setting the `deletedAt` timestamp.
