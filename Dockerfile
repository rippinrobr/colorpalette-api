FROM node:lts-alpine3.15 AS deps
WORKDIR /srv
COPY package*.json ./
RUN npm ci --only=production

FROM alpine:3.14 AS release
ENV V 16.13.0
ENV FILE node-v$V-linux-x64-musl.tar.xz

RUN apk add --no-cache libstdc++ \
    && apk add --no-cache --virtual .deps curl \
    && curl -fsSLO --compressed \
    "https://unofficial-builds.nodejs.org/download/release/v$V/$FILE" \
    && tar -xJf $FILE -C /usr/local --strip-components=1 \
    && rm -f $FILE /usr/local/bin/npm /usr/local/bin/npx \
    && rm -rf /usr/local/lib/node_modules \
    && apk del .deps

WORKDIR /srv
COPY --from=deps /srv/node_modules ./node_modules
COPY . .

EXPOSE 9200
ENV HOST 0.0.0.0
ENV PORT 9200
ENV ELASTIC_SEARCH http://0.0.0.0:9200
CMD [ "node", "dist/main" ]