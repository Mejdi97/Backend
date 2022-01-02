FROM node:12

WORKDIR /usr/src/my_app

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]