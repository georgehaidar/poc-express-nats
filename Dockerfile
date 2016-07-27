FROM alpine:3.4

VOLUME /app

RUN apk update \
  && apk add nodejs \
  && npm install -g nodemon

WORKDIR /app

