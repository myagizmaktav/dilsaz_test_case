/* eslint-disable no-undef */
import { Main } from "@/components/main/main";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

describe("App", () => {
  test("Table Create Button Rendering", async () => {
    await React.act(async () => {
      render(<Main></Main>);
    });
    const createButton = screen.getByText(/\+ Create/);

    expect(createButton).toBeInTheDocument();
  });

  test("Table Search Box Rendering", async () => {
    await React.act(async () => {
      render(<Main></Main>);
    });
    const searchBox = screen.getByPlaceholderText("Search");

    expect(searchBox).toBeInTheDocument();
  });
});
