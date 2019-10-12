FROM node:10.5

ENV NODE_ROOT /usr/app/
RUN mkdir -p $NODE_ROOT
WORKDIR $NODE_ROOT

COPY package.json package-lock.json ./
RUN rm -rf node_modules && npm install --unsafe-perm

COPY . .

EXPOSE 3000
