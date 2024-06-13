FROM node:alpine
COPY ./package.json ./package-lock.json ./server.js ./
RUN npm install
EXPOSE 8080
CMD node server.js