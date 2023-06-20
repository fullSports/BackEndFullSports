FROM node:20.3.0

# RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli
RUN npm install -g pnpm
USER node

WORKDIR /home/node/app