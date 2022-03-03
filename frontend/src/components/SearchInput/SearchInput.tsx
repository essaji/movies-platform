import React from "react";
import Search from "antd/lib/input/Search";
import { Dropdown, Menu } from "antd";
import { Movie } from "../../types";
import useSearchInput from "./useSearchInput";

export default function SearchInput() {
  const {
    searchDefaultValue,
    moviesList,
    onClickMovieTitle,
    onSearchInputChange,
    onSearch
  } = useSearchInput();
  return (
    <Dropdown trigger={["click"]} overlay={
      moviesList?.length ? <Menu>
        {moviesList.map((movie: Movie) => <Menu.Item onClick={() => onClickMovieTitle(movie.id)} key={movie.id}>{movie.title}</Menu.Item>)}
      </Menu> : <div />
    }>
      <Search
        allowClear
        defaultValue={searchDefaultValue!!}
        placeholder="Type movie name..."
        onSearch={onSearch}
        onChange={onSearchInputChange}
        style={{ width: 250 }} />
    </Dropdown>
  );
}