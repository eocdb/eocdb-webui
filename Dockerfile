FROM yarnpkg/node-yarn:latest

MAINTAINER helge.dzierzon@brockmann-consult.de

RUN git clone https://github.com/bcdev/eocdb-webui

WORKDIR /eocdb-webui

RUN yarn install
RUN yarn run test --ci
RUN yarn build

EXPOSE 5000

CMD ['bash -c serve -s build']