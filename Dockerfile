FROM node:18.14.0-alpine AS build

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
COPY . . 
RUN npm run build


FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/nginx.conf

# # 80포트 오픈하고 nginx 실행
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]