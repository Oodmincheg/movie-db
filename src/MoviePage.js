import React from "react";
import styled from "styled-components";
import WatchListButton from "./AddWatchListButton";
import Recomendations from "./Recomendations";

const Content = styled.div`
  display: flex;
`;

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movieDetails: {}
    };
  }
  componentDidMount() {
    //prettier-ignore
    const url = `https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=98135c4d3cc392347281f8d007876760&language=en-US`;
    fetch(url)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            movieDetails: data
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    if (!this.state.isLoaded) {
      return <h2>Loading...</h2>;
    } else {
      return (
        <div>
          <header>
            <h1>{this.state.movieDetails.title}</h1>
          </header>
          <Content>
            <aside>
              <img
                src={`https://image.tmdb.org/t/p/w300/${
                  this.state.movieDetails.poster_path
                }`}
                alt={`${this.state.movieDetails.title} poster`}
              />
            </aside>
            <content>
              <section>
                <h3>Overview</h3>
                <p>{this.state.movieDetails.overview}</p>
              </section>
              <section>
                <h3>Genre</h3>
                <p>
                  {this.state.movieDetails.genres
                    .map(genre => genre.name)
                    .join(", ")}
                </p>
              </section>
              <Recomendations id={this.state.movieDetails.id} />
              <WatchListButton
                id={this.state.movieDetails.id}
                title={this.state.movieDetails.title}
              />
            </content>
          </Content>
        </div>
      );
    }
  }
}

export default MoviePage;
