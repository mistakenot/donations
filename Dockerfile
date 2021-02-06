FROM node:12 AS builder

WORKDIR /build

RUN apt-get update && apt-get install -y sqlite3 make
RUN npm install -g nest-cli

COPY server ./server
COPY makefile .
RUN make build-server

FROM node:12

WORKDIR /app

COPY --from=builder /build/server .

CMD npm run start:prod
