FROM node:12 AS builder

WORKDIR /build

RUN apt-get update && apt-get install -y sqlite3 make
RUN npm install -g nest-cli

COPY server/package.json .
COPY server/package-lock.json .

RUN npm i

COPY server .
RUN npm run build

FROM node:12

WORKDIR /app

COPY --from=builder /build/ .

ENV PORT 3000

CMD npm run start:prod
