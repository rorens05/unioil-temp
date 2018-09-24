FROM node:8.11.3 as dev-build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH




# install and cache app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn

# start app
CMD ["npm", "start"]







