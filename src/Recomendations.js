import React from "react";
import { connect } from "react-redux";
import { getAPIRecomendations } from "./actionsAndReducers";

class Recomendations extends React.Component {
  componentDidMount() {
    this.props.getAPIRecomendations();
  }

  render() {
    return (
      <section>
        <h3>Recomendations</h3>
        {this.props.recomendations
          .map(movie => movie.original_title)
          .join(", ")}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  recomendations: state.recomendations
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getAPIRecomendations() {
    console.log("here recomendations", ownProps);
    dispatch(getAPIRecomendations(ownProps.id));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recomendations);
