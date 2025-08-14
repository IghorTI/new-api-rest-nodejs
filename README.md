# new-api-rest-nodejs


# Dependencies 

-- Controle de rotas da aplicação 
> npm i fastify 

-- Typescript com a integração com o NodeJS
npm i typescript @types/node -D

-- 
npm i pino-pretty

Reference: https://fastify.dev/docs/v5.3.x/Reference/Logging/

    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },


# Commands 
After install Typescript run the command : 

npx tsc --init

Step 1: 
Access the URL : https://github.com/tsconfig/bases

Step 2: 
Find the node version that you're using 

Step 3: 
Copy the configurations 

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "_version": "22.0.0",

  "compilerOptions": {
    "lib": ["es2024", "ESNext.Array", "ESNext.Collection", "ESNext.Iterator"],
    "module": "nodenext",
    "target": "es2022",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  }
}