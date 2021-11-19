FROM node:14.18.1 AS node_base

ENV USER root
ENV WORK_DIR_PATH /home
RUN mkdir -p $WORK_DIR_PATH && chown -R $USER:$USER $WORK_DIR_PATH
WORKDIR $WORK_DIR_PATH

RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version

RUN apt-get update && apt-get install -y git


COPY . $WORK_DIR_PATH

RUN npm install

RUN ["chmod", "+x", "/home/action-entry.sh"]

ENTRYPOINT ["/home/action-entry.sh"]
