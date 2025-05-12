FROM node:22.15-alpine

COPY . /orders

WORKDIR /orders

RUN npm install && npm run build

EXPOSE 4042

CMD ["npm", "start"]