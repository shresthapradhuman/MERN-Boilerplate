FROM node:14.17.0
RUN apt-get update && apt-get install -y vim 
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY . /app
RUN yarn install
CMD ["npm", "start"]