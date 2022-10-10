FROM node:latest
WORKDIR /app/
COPY build/ build/
RUN  npm install express
COPY server.js .
CMD [ "node","server.js"]
