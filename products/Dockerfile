FROM node:alpine3.20

COPY . /products

WORKDIR /products

RUN npm install && npm run build

EXPOSE 4041

CMD ["npm", "start"]