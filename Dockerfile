# Docker needs to be at version 17.0+
# to combine 'as build' methods
#FROM node:14.15.0 as build
#WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
#COPY package.json yarn.lock /app/
#RUN npm install
#COPY . /app/
#CMD ["npm","start"]

FROM nginx:1.17.5-alpine
COPY ./build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
