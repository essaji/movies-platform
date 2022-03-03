import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { searchFirstFiveMovies } from "../../services/services";

export default function useSearchInput() {
  const [searchParam] = useSearchParams()
  const [inputSearchKeyword, setInputSearchKeyword] = useState<string>("");
  const {
    data,
    refetch
  } = useQuery(`search_movie_${inputSearchKeyword}`, () => searchFirstFiveMovies(inputSearchKeyword), { enabled: false });
  const navigate = useNavigate();
  const [, setTimeoutRef] = useState<NodeJS.Timeout>();

  const onSearchInputChange = (e: any) => {
    if (!e.target.value) return
    setInputSearchKeyword(e.target.value);
    const newTimeout = setTimeout(() => {
      refetch();
    }, 500);
    setTimeoutRef(prevTimeout => {
      clearTimeout(prevTimeout!!);
      return newTimeout;
    });
  }

  return {
    searchDefaultValue: searchParam.get('query'),
    setInputSearchKeyword,
    moviesList: data?.data,
    refetch,
    onClickMovieTitle: (movieId: string) => navigate(`detail/${movieId}`),
    onSearchInputChange,
    onSearch: (textToSearch: string) => navigate(`?query=${textToSearch}`)
  }
}