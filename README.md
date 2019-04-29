[![Build Status](https://travis-ci.org/bcdev/eocdb-webui.svg?branch=master)](https://travis-ci.org/bcdev/eocdb-webui)
[![Docker Repository on Quay](https://quay.io/repository/bcdev/eocdb-webui/status "Docker Repository on Quay")](https://quay.io/repository/bcdev/eocdb-webui)

[EUMETSAT DATABASE](http://eocdb.readthedocs.org)

# EUMETSAT Ocean Colour Database

## Install

The WEBUI uses the fowllowing technologies:

- React
- Typescript
- nodejs
- yarn
- leaflet


To install a development version install the above dependencies and execute the following steps that
will install all dependencies and start a dev server on port 3000:

```bash

git clone https://github.com/bcdev/eocdb-webui.git
cd  eocdb-webui
yarn install
yarn start

``` 


For installing a production version we encourage you to use our docker container. The
container exposes port 3000. It is up to you to map it to a different port.


```bash

docker run https://quay.io/bcdev/eocdb-webui:latest

``` 


We also provide a repository that allows to install the whole OCDB infrastructure including
the backend server, mongo DB, and this WEBUI. Running all services will require docker as
well as docker-compose. The build process will copy the WEBUI static files into the server
image. 'up -d' will start two containers: One mongodb databse server and teh backend server which also
serves the WEBUI site. 

```bash

git clone https://github.com/bcdev/eocdb-services/
docker-compose build
docker-compose up -d

``` 

The following example shows the running server on [ocdb.eumetsat.int](https://ocdb.eumetsat.int). 
As you can see the server exposes port 4000 but is mapped to 443.

```
$ ./docker-compose ps

                Name                           Command                  State              Ports
    ----------------------------------------------------------------------------------------------------
    eocdb-services_eocdb-db_1       docker-entrypoint.sh mongod      Up             27017/tcp
    eocdb-services_eocdb-server_1   /bin/bash -c source activa ...   Up (healthy)   0.0.0.0:80->4000/tcp

```



