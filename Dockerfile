# Official Node image for fat version
# FROM node:argon
# Awesome tiny node image
FROM node:7.6.0

WORKDIR /app
ADD . /app

ENTRYPOINT [ "node", "server.js" ]

ENV PROXY_DOMAIN='环境变量配置案列'


