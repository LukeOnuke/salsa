# SALSA - Serviced Automatic Log Sorting Aplication
> [!CAUTION]
> This project is not complete yet and a WORK IN PROGRESS.
>
> Published it becuase ive been playing with this for months and finaly wanted to reveal it to the world
Sift through the noise and find what's mission critical with SALSA.

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