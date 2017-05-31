FROM node:6.10.0-alpine

RUN npm install pm2 -g

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --silent

# Bundle app source
COPY . /usr/src/app

EXPOSE 3001

RUN npm run build

CMD ["pm2-docker", "--json", "processes.json"]
