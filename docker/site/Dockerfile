FROM node:8.9.3

RUN apt-get update
RUN apt-get install -y git zip sudo nano

WORKDIR /var/www/react

RUN npm install -g nodemon
RUN npm install -g react-scripts

# ENTRYPOINT ["nodemon", "-L", "--debug", "server.js"]
# ENTRYPOINT ["node", "--inspect-brk=127.0.0.1:5858", "src/App.js"]
CMD ["npm", "start"]