# SALSA - Serviced Automatic Log Sorting Aplication
> [!CAUTION]
> This project is not complete yet and a WORK IN PROGRESS.
>
> Published it becuase ive been playing with this for months and finaly wanted to reveal it to the world

Privatly sift through thausands of log messages across your entire infrastructure in real time whilst keeping all your private data in your network. Categorises incomming log messages with local self hosted LLM models. Currently tooled for LLAMA. Future idea if it gets attention is to train a efficient model to categorise logs with less hardware cost.

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