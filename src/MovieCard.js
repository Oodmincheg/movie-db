import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WatchListButton from './AddWatchListButton';

const Wrapper = styled.div`
  font-family: 'Inconsolata', monospace;
  width: 40%;
  margin: 0 4% 20px 4%;
  border: 2px solid lightblue;
  border-radius: 4px;
  text-align: center;
  font-style: italic;
`;
const Image = styled.img`
  border: 2px solid lightblue;
  float: left;
  margin-right: 20px;
`;

const Genre = styled.div`
  &:before {
    content: 'Genre: ';
    font-weight: bold;
    color: darkblue;
  }
  margin: 30px auto;
`;

const H2 = styled.h2`
  color: darkblue;
  &:visited {
    color: blue;
  }
  text-decoration: none;
`;
const MovieCard = props => {
  const { id, title, genre_ids } = props.movie;
  const imgSrc = `https://image.tmdb.org/t/p/w154/${props.movie.poster_path}`;
  return (
    <Wrapper className="movie-card">
      <Image src={imgSrc} alt={title} />
      <Link to={`/movie/${id}`} style={{ textDecoration: 'none' }}>
        <H2>{title}</H2>
      </Link>

      <Genre>
        {props.allGenres
          .filter(genre => genre_ids.includes(genre.id))
          .map(genre => genre.name)
          .join(', ')}
      </Genre>
      <WatchListButton id={id} title={title} />
    </Wrapper>
  );
};

export default MovieCard;
