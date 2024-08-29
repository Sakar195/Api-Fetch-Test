import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserList from "./UserList";

// Mock the fetch function globally
global.fetch = jest.fn();

describe("UserList Component", () => {
  beforeEach(() => {
    // clear all mocks before each test
    fetch.mockClear();
  });

  test("displays loading state initially", () => {
    // Simulate a pending fetch request
    fetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<UserList />);

    // Check that the loading message is displayed
    expect(
      screen.getByText("Data is Loading, please wait...")
    ).toBeInTheDocument();
  });

  test("renders user list when data is fetched", async () => {
    const mockUsers = [
      { id: 1, name: "Leanne Graham " },
      { id: 2, name: "Ervin Howell" },
      { id: 3, name: "Clementine Bauch" },
    ];

    // Simulate a successful fetch request
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });
    // render the list after mockUsers is fetched
    render(<UserList />);

    // wait and Check that the user list is displayed
    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    expect(await screen.findByText("Ervin Howell")).toBeInTheDocument();
    expect(await screen.findByText("Clementine Bauch")).toBeInTheDocument();
  });

  //test case for failed fetch request and error message being displayed
  test("displays error message on fetch failure", async () => {
    // Simulate a failed fetch request
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch Request Failed"))
    );

    render(<UserList />);

    // wait and Check that the error message
    expect(
      await screen.findByText("Error in fetching Data")
    ).toBeInTheDocument();
  });
});
