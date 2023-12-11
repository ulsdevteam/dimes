FROM node:lts-alpine as build
WORKDIR /app
ARG REACT_APP_ARGO_BASEURL
ARG REACT_APP_REQUEST_BROKER_BASEURL
ARG REACT_APP_LOCALSTORAGE_KEY
ARG REACT_APP_MINIMAP_KEY
ARG REACT_APP_S3_BASEURL
ARG REACT_APP_EMAIL
ARG REACT_APP_RECAPCHA_SITE_KEY
ARG REACT_APP_AEON_URL
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install --silent
COPY . ./
RUN yarn run build

FROM nginx:1.17.4-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
