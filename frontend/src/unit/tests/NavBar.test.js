import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NavBar from "../../NavBar";

it("renders component", async () => {
  const { getByText } = render(<NavBar />);

  expect(getByText("Login")).toBeInTheDocument();
});
