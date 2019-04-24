#!/usr/bin/env bash
docker rmi $(docker images -f "dangling=true" -q)

docker run --rm -v "$PWD":/app -w /app iron/node:dev npm install --registry=https://registry.npm.taobao.org

docker build -t cloudshoe-wap-1.0 .

#!删除容器
docker rm -f cloudshoe-wap-1.0-container

docker run --name cloudshoe-wap-1.0-container -d -p 7300:8081 cloudshoe-wap-1.0
