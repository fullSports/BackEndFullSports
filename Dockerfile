FROM node:20.5.1

# RUN apk add --no-cache bash
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
USER node

WORKDIR /home/node/app