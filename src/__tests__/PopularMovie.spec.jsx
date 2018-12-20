import React from "react";
import { shallow, configure } from "enzyme";
import PopularMovies from "../PopularMovies";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("Popular movies renders correctly", () => {
  const component = shallow(<PopularMovies />);
  expect(component).toMatchSnapshot();
});
