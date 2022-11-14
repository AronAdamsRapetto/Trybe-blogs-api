FROM node:16.14

WORKDIR /app

COPY . .

RUN npm install
RUN apt update
RUN apt install lsof