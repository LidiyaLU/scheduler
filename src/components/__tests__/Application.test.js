import React from "react";

import { render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent, prettyDOM, queryByText, queryByAltText, getByText, getByPlaceholderText, getAllByTestId, getByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    /*
    using promise:(minus the async above)
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
    */
    //using async/await does not replace the use of promises:
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

});
