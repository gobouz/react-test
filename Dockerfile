FROM node:8.9.3

WORKDIR /var/www/react

RUN npm install -g nodemon@1.14.3
RUN npm install -g react-scripts@1.0.17

COPY package.json /var/www/react/package.json
COPY package-lock.json /var/www/react/package-lock.json
RUN npm install
RUN npm ls
RUN mv /var/www/react/node_modules /node_modules

# CMD ["nodemon", "--inspect-brk=127.0.0.1:5858"]
# CMD ["nodemon", "-L", "--inspect-brk=127.0.0.1:5858"]
# CMD ["node", "--inspect-brk=127.0.0.1:5858"]
CMD ["npm", "start"]