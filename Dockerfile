FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "yarn", "dev" ]