# references:
# - [How to write a Nest.js Dockerfile optimized for production](https://www.tomray.dev/nestjs-docker-production)


FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]