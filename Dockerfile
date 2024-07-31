# Stage 1 - the build process
FROM node:latest as build-deps

MAINTAINER sabine.embacher@brockmann-consult.de

LABEL software=OCDB
LABEL version=0.1.0

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn --version
RUN yarn install --network-concurrency 1 --network-timeout 1000000
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
#FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
