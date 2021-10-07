import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FetchUser from "../../FetchUser";
import validUser from "../mocks/validUser.json";

const server = setupServer(
  rest.get(
    "https://random-data-api.com/api/users/random_user",
    (_req, res, ctx) => {
      return res(ctx.json(validUser));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("loads and displays user", async () => {
  render(<FetchUser />);

  fireEvent.click(screen.getByText("Fetch user"));

  // await waitFor(() => screen.getByRole("textbox"))
  const textbox =  screen.getByRole('textbox');

  await waitFor(() => {
    expect(textbox).toHaveTextContent('UserData');
  });
});

it("handles server error", async () => {
  server.use(
    rest.get(
      "https://random-data-api.com/api/users/random_user",
      (_req, res, ctx) => {
        return res(ctx.status(500));
      }
    )
  );

  render(<FetchUser />);

  fireEvent.click(screen.getByText("Fetch user"));

  // await waitFor(() => screen.getByRole("textbox"));
  const textbox = screen.getByRole('textbox');

  await waitFor(() =>
    expect(textbox).toHaveTextContent(
      "Something went wrong..."
    )
  );
});
