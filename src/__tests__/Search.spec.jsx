import React from "react";
import renderer from "react-test-renderer";
import PopularMovies from "./PopularMovies";

test("Popular movies renders correctly", () => {
  const component = renderer.create(<PopularMovies />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
