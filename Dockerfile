FROM node:latest

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /usr/code

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js" ]