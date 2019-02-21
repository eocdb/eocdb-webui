FROM yarnpkg/node-yarn:latest

MAINTAINER helge.dzierzon@brockmann-consult.de

RUN git clone https://github.com/bcdev/eocdb-webui

WORKDIR /eocdb-webui

RUN yarn install
RUN yarn run test --ci

EXPOSE 3000

CMD ['yarn run start']