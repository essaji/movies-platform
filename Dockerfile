FROM node:16-alpine
WORKDIR /usr/server/app

COPY ./package.json ./

RUN mkdir frontend
COPY ./frontend/package.json ./frontend
RUN npm install
RUN npm --prefix ./frontend install

COPY ./ .

RUN npm run build
RUN npm --prefix ./frontend run build

ENV NODE_ENV=production
RUN export IMAGE_HOST_URL=https://image.tmdb.org/t/p/
RUN export BASE_URL=https://api.themoviedb.org/3
RUN export API_KEY=12c6aac2e0b2882014fed1e8ddf0cfe4
CMD ["node", "dist/main"]