# SALSA - Serviced Automatic Log Sorting Aplication
> [!INFO]
> This project is very much a work in progress still.

Privatly sift through thausands of log messages across your entire infrastructure in real time whilst keeping all your private data in your network. Categorises incomming log messages with local self hosted LLM models. Currently tooled for LLAMA.

## Setup
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