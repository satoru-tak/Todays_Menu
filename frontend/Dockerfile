FROM node:16.17.1-bullseye-slim

WORKDIR /client

RUN apt update \
  && yarn install

COPY . ./
COPY package.json /client/package.json
COPY yarn.lock /client/yarn.lock

EXPOSE 8080
CMD ["yarn", "dev", "--host"]