import React from "react";
//
class Recomendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      recomendations: []
    };
  }
  componentDidMount() {
    //prettier-ignore
    const url = `https://api.themoviedb.org/3/movie/${this.props.id}/recommendations?api_key=98135c4d3cc392347281f8d007876760&language=en-US&page=1`;
    fetch(url)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            recomendations: data.results
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
      return <h4>Loading...</h4>;
    } else {
      return (
        <section>
          <h3>Recomendations</h3>
          {this.state.recomendations
            .map(movie => movie.original_title)
            .join(", ")}
        </section>
      );
    }
  }
}

export default Recomendations;
