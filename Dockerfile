FROM nginx:latest

RUN apt-get update

RUN apt-get install curl git -y

WORKDIR /var/www

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get install -y nodejs

ADD . .

RUN npm config set strict-ssl false

RUN npm install

RUN npm run build

ADD ./nginx/site.conf /etc/nginx/conf.d/default.conf
ADD ./nginx/nginx.conf /etc/nginx/nginx.conf
