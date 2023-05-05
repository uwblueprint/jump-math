FROM node:19.6.1-slim

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

# libcurl3 is required for mongodb-memory-server, which is used for testing
RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list
RUN apt-get update && apt-get install -y libcurl3

RUN yarn install

COPY . ./

EXPOSE 5000
ENTRYPOINT ["yarn", "dev"]
