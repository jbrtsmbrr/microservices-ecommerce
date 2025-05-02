FROM node:alpine3.20

COPY . /payments

WORKDIR /payments

RUN npm install && npm run build

EXPOSE 4043

CMD ["npm", "start"]