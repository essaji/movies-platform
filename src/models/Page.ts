import Movie from './Movie';

export default class Page {
  page: number;
  movies: Movie[];
  totalPages: number;

  constructor(page) {
    return {
      page: page.page,
      movies: page.results.map((p) => new Movie(p)),
      totalPages: page.total_pages,
    };
  }
}
