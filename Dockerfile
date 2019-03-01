FROM ubuntu:latest

MAINTAINER helge.dzierzon@brockmann-consult.de

RUN apt-get update && apt-get install -y nodejs apt-transport-https curl git gnupg  gnupg2 gnupg1 npm
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list 
RUN apt-get update && apt-get install -y yarn

WORKDIR /eocdb-webui

ADD . /eocdb-webui
RUN git checkout dzelge_submit
RUN yarn install --no-cache --frozen-lockfile
#RUN yarn run test --ci
#RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

