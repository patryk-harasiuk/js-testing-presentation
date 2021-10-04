import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NavBar from "./NavBar";

test("if component includes text", async () => {
  const { getByText } = render(<NavBar />);
  expect(getByText("Login")).toBeInTheDocument();
});
