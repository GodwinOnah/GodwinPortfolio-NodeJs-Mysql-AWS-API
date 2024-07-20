FROM node:latest

WORKDIR /usr/code

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js" ]