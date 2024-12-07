FROM repo.a-five.ir/node:18-alpine AS builder

RUN apk add --no-cache make g++ gcc git

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

WORKDIR /app

ADD package*.json .

RUN npm install

ADD . .

RUN npm run build

FROM repo.a-five.ir/nginx:stable-alpine

RUN apk add --no-cache bash gawk sed grep bc coreutils

ADD nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
