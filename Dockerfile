FROM nginx:1.12-alpine

MAINTAINER helge.dzierzon@brockmann-consult.de

LABEL software=OCDB
LABEL version=0.1.0

ADD ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

