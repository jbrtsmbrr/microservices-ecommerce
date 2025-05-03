FROM node:alpine3.20

COPY . /orders

WORKDIR /orders

RUN npm install && npm run build

EXPOSE 4042

CMD ["npm", "start"]