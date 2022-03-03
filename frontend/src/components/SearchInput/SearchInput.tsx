import React, { useState } from "react";
import Search from "antd/lib/input/Search";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { searchFirstFiveMovies } from "../../services/services";
import { Dropdown, Menu } from "antd";
import { Movie } from "../../types";

export default function SearchInput() {
  const [inputSearchKeyword, setInputSearchKeyword] = useState<string>("");
  const {
    data,
    refetch
  } = useQuery(`search_movie_${inputSearchKeyword}`, () => searchFirstFiveMovies(inputSearchKeyword), { enabled: false });
  const navigate = useNavigate();
  const [, setTimeoutRef] = useState<NodeJS.Timeout>();
  return (
    <Dropdown trigger={["click"]} overlay={
      data?.data.length ? <Menu>
        {data?.data.map((movie: Movie) => <Menu.Item onClick={() => navigate(`detail/${movie.id}`)}
                                                     key={movie.id}>{movie.title}</Menu.Item>)}
      </Menu> : <div />
    }>
      <Search
        placeholder="Type movie name..."
        onSearch={textToSearch => navigate(`?query=${textToSearch}`)}
        onChange={e => {
          setInputSearchKeyword(e.target.value);
          const newTimeout = setTimeout(() => {
            refetch();
          }, 500);
          setTimeoutRef(prevTimeout => {
            clearTimeout(prevTimeout!!);
            return newTimeout;
          });
        }}
        style={{ width: 250 }} />
    </Dropdown>
  );
}