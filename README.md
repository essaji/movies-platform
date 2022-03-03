## Discover Movies Project
For the purpose of the project & to avoid switching frontend & backend repositories both backend & frontend are kept in this same repository.

`/src` contains backend implementation

`/frontend` contains the frontend implementation

Preview Here: http://discover-movie.herokuapp.com/

### Get it running locally

* Export required env variables
```shell
export IMAGE_HOST_URL=https://image.tmdb.org/t/p
export BASE_URL=https://api.themoviedb.org/3
export API_KEY=***************************
```
* Then run:
```shell
npm run start:dev
```
go to `http://localhost:3000` to preview