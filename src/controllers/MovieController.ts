import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
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

  @Get('search')
  searchMovieNames(@Query() query): Observable<Movie[]> {
    return this.movieService.searchMovieNames(query.query);
  }

  @Get(':movieId')
  movieDetail(@Param() params): Observable<Movie> {
    return this.movieService.movieDetail(params.movieId);
  }

  @Get(':movieId/reviews')
  movieReviews(@Param() params): Observable<Movie> {
    return this.movieService.movieReviews(params.movieId);
  }

  @Get('image/:imageUri')
  async movieImages(@Param() params, @Res() res, @Query() query): Promise<any> {
    const data = await this.movieService.movieImage(
      params.imageUri,
      query.size,
    );
    const img = Buffer.from(data, 'utf-8');
    res.writeHead(200, {
      'Content-Type': 'image/jpg',
      'Content-Length': img.length,
    });
    res.end(img);
  }
}
