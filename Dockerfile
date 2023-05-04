FROM node:16.20.0

# RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app