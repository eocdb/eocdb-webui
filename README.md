[![Docker Repository on Quay](https://quay.io/repository/bcdev/eocdb-webui/status "Docker Repository on Quay")](https://quay.io/repository/bcdev/eocdb-webui)
[![Documentation Status](https://ocdb.eumetsat.int/docs)](https://ocdb.eumetsat.int/docs)

- [Copernicus OCDB Docs](http://ocdb.readthedocs.org)
- [Copernicus OCDB](http://ocdb.eumetsat.int)

# Copernicus Ocean Colour Database / WebUI

>Copyright (C) 2019 Copernicus/EUMETSAT  
>
>License: MIT

The [Copernicus](https://www.copernicus.eu) Ocean Colour Database stores in-situ data collected on ocean ship cruises. The aim is to 
provide an environment that follows FAIR principles (findable, accessible, interoperable, reusable).  

## Custom Installation

The WebUI uses the following technologies:

- React
- Typescript
- nodejs
- yarn
- leaflet

To install a development version, you will need to install git, nodejs and yarn and execute the following steps that
will install all dependencies and start a development server on port 3000:

```bash

git clone https://github.com/bcdev/eocdb-webui.git
cd  ocdb-webui
yarn install
yarn start

``` 

For installing a production version we encourage you to use our docker container. The
container exposes port 3000. It is up to you to map it to a different port.


```bash
docker run -p 3000:3000 quay.io/eocdb/ocdb-webui:latest
``` 


We also provide a repository that allows to install the whole OCDB infrastructure including
the backend server, Mongo DB, and this WebUI. Running all services will require docker as
well as docker-compose to be installed on your system. The build process will copy the WEBUI 
static files into the server image. 'up -d' will start two containers: One mongodb database server 
and the backend server which serves the RESTful service as well as the WebUI site. 

```bash
git clone https://github.com/eocdb/ocdb-services
cd eocdb-services
docker-compose build
docker-compose up -d
``` 

The following example shows the running server on [ocdb.eumetsat.int](https://ocdb.eumetsat.int). 
As you can see the server exposes port 4000 but is mapped to 443.

```
$ ./docker-compose ps

                Name                           Command                  State              Ports
    ----------------------------------------------------------------------------------------------------
    ocdb-services_eocdb-db_1       docker-entrypoint.sh mongod      Up             27017/tcp
    ocdb-services_eocdb-server_1   /bin/bash -c source activa ...   Up (healthy)   0.0.0.0:80->4000/tcp

```


