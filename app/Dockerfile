FROM node:22-alpine

WORKDIR ./doc_img

COPY . . 

RUN npm install

RUN npm run build

EXPOSE 4040

CMD ["node", "./dist/index.js"]