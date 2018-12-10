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
class MovieCard extends React.Component {
  render() {
    return (
      <Wrapper className="movie-card">
        <Image src={this.props.imgSrc} alt={this.props.title} />
        <Link to={`/movie/${this.props.id}`}>
          <h2>{this.props.title}</h2>
        </Link>
        <WatchListButton id={this.props.id} title={this.props.title} />
        <p>
          {this.props.allGenres
            .filter(genre => this.props.genres.includes(genre.id))
            .map(genre => genre.name)
            .join(", ")}
        </p>
      </Wrapper>
    );
  }
}

export default MovieCard;
