FROM node:alpine3.20

# Create app directory
COPY . /delivery

# Set the working directory
WORKDIR /delivery

# Install app dependencies and build the app
RUN npm install && npm run build

# Setup Ports
ENV PORT=4044

EXPOSE 4044

# Start the app
CMD ["npm", "start"]