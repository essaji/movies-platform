import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import Page from '../models/Page';
import Movie from '../models/Movie';
import axios from 'axios';

@Injectable()
export class MovieService {
  constructor(private httpService: HttpService) {}

  discoverMovie({ sort_by, size }: any): Observable<Page> {
    return this.httpService
      .get(`/discover/movie`, { params: { sort_by } })
      .pipe(
        map((response) =>
          response.data.results.slice(0, size).map((m: any) => new Movie(m)),
        ),
      );
  }

  searchMovie(query: string): Observable<Page> {
    return this.httpService
      .get(`/search/movie`, { params: { query } })
      .pipe(map((response) => new Page(response.data)));
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
}
