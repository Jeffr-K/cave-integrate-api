
- #### Dockerfile 

```docker
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]
```

- #### Docker network
- 

- #### Trouble Shooting
> Ports are not available: exposing port TCP 0.0.0.0:5000 -> 0.0.0.0:0: listen tcp 0.0.0.0:5000: bind: address already in use.

- Solution: `sudo lsof -i :4000`