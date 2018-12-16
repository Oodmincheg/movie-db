import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import WatchListButton from "./AddWatchListButton";

const Wrapper = styled.div`
  width: 40%;
  margin: 0 4% 20px 4%;
  border: 2px solid #333;
  border-radius: 4px;
`;
const Image = styled.img`
  float: left;
`;
const MovieCard = props => {
  const { id, title, genre_ids } = props.movie;
  const imgSrc = `https://image.tmdb.org/t/p/w154/${props.movie.poster_path}`;
  return (
    <Wrapper className="movie-card">
      <Image src={imgSrc} alt={title} />
      <Link to={`/movie/${id}`}>
        <h2>{title}</h2>
      </Link>
      <WatchListButton id={id} title={title} />
      <p>
        {props.allGenres
          .filter(genre => genre_ids.includes(genre.id))
          .map(genre => genre.name)
          .join(", ")}
      </p>
    </Wrapper>
  );
};

export default MovieCard;
