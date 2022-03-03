import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from '../services/MovieService';
import { Observable } from 'rxjs';
import Movie from '../models/Movie';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('discover')
  discoverMovie(@Query() query): Observable<Movie[]> {
    return this.movieService.discoverMovie(query);
  }

  @Get(':movieId')
  movieDetail(@Param() params): Observable<Movie> {
    return this.movieService.movieDetail(params.movieId);
  }

  @Get(':movieId/reviews')
  movieReviews(@Param() params): Observable<Movie> {
    return this.movieService.movieReviews(params.movieId);
  }
}
