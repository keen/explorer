FROM nginx:latest

RUN apt-get update

RUN apt-get install curl git -y

WORKDIR /var/www

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get install -y nodejs bzip2

ADD . .

RUN npm config set strict-ssl false

RUN npm install

RUN npm run build

CMD rm -rf /www/keen-explorer && mkdir -p /www/keen-explorer && cp -r ./dist /www/keen-explorer && cp ./demo/index.html /www/keen-explorer
