import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

/*
  We import the component that we are testing
*/

/*
  A test that renders a React Component
*/
it("renders without crashing", () => {
  render(<Application />);
});