import "./matchMediaMock";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Table from "./pages/table/table";

describe("App", () => {
  test("Table Create Button Rendering", async () => {
    await React.act(async () => {
      render(<Table></Table>);
    });
    const createButton = screen.getByText(/\+ Create/);

    expect(createButton).toBeInTheDocument();
  });

  test("Table Search Box Rendering", async () => {
    await React.act(async () => {
      render(<Table></Table>);
    });
    const searchBox = screen.getByPlaceholderText("Search");

    expect(searchBox).toBeInTheDocument();
  });
});
