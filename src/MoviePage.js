import React from "react";
import styled from "styled-components";
import WatchListButton from "./AddWatchListButton";
import Recomendations from "./Recomendations";
import { connect } from "react-redux";
import { getMovieDetails } from "./actionCreators";

const Content = styled.div`
  display: flex;
`;

class MoviePage extends React.Component {
  componentDidMount() {
    this.props.getMovieDetails();
  }
  render() {
    if (Object.getOwnPropertyNames(this.props.movieDetails).length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <header>
            <h1>{this.props.movieDetails.title}</h1>
          </header>
          <Content>
            <aside>
              <img
                src={`https://image.tmdb.org/t/p/w300/${
                  this.props.movieDetails.poster_path
                }`}
                alt={`${this.props.movieDetails.title} poster`}
              />
            </aside>
            <content>
              <section>
                <h3>Overview</h3>
                <p>{this.props.movieDetails.overview}</p>
              </section>
              <section>
                <h3>Genre</h3>
                <p>
                  {this.props.movieDetails.genres
                    .map(genre => genre.name)
                    .join(", ")}
                </p>
              </section>
              <Recomendations id={this.props.movieDetails.id} />
              <WatchListButton
                id={this.props.movieDetails.id}
                title={this.props.movieDetails.title}
              />
            </content>
          </Content>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  movieDetails: state.movieDetails
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getMovieDetails() {
    dispatch(getMovieDetails(ownProps.id));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
