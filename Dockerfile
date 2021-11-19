FROM node:latest AS node_base

RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version

RUN apt-get update && apt-get install -y git

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

ENTRYPOINT ["/usr/src/app/action-entry.sh"]
