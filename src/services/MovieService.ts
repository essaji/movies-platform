import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import Movie from '../models/Movie';
import axios from 'axios';
import Review from '../models/Review';

@Injectable()
export class MovieService {
  constructor(private httpService: HttpService) {}

  discoverMovie({ sort_by, size, search }: any): Observable<Movie[]> {
    if (search) return this.searchMovie({ sort_by, size, search });
    return this.httpService
      .get(`/discover/movie`, { params: { sort_by } })
      .pipe(
        map((response) =>
          response.data.results.slice(0, size).map((m: any) => new Movie(m)),
        ),
      );
  }

  searchMovie({ sort_by, size, search }: any): Observable<Array<Movie>> {
    return this.httpService
      .get(`/search/movie`, { params: { sort_by, query: search } })
      .pipe(
        map((response) =>
          response.data.results.slice(0, size).map((m: any) => new Movie(m)),
        ),
      );
  }

  movieDetail(movieId: string): Observable<Movie> {
    return this.httpService
      .get(`/movie/${movieId}`)
      .pipe(map((response) => new Movie(response.data)));
  }

  async movieImage(imageUri: string, size: string): Promise<string> {
    const url = `${process.env.IMAGE_HOST_URL}/${size}/${imageUri}`;
    return (await axios.get(url, { responseType: 'arraybuffer' })).data;
  }

  movieReviews(movieId: string) {
    return this.httpService
      .get(`/movie/${movieId}/reviews`)
      .pipe(
        map((response) => response.data.results.map((r: any) => new Review(r))),
      );
  }

  searchMovieNames(query: string): Observable<Movie[]> {
    return this.searchMovie({ search: query });
  }
}
