
import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import  PokemonList  from "./PokemonList";
import { Provider } from 'react-redux'
import { store } from "../../store";
import '@testing-library/jest-dom'
import * as Queries from "../../store/redux-api";
import * as Hooks from "../../hooks";

jest.mock("../../store/redux-api",() => ({
  ...jest.requireActual("../../store/redux-api"),
  useGetAllPokemonsQuery: jest.fn(),
}));

jest.mock("../../hooks", () => ({
  ...jest.requireActual("../../hooks"),
  useFetchPokemonsDetails: jest.fn()
}));

const WithProviders = ({ children }) => {
  return (
    <Provider store={store}>{ children}</Provider>
  )
}

const mockedPokemon = { name: "test-name", url: "/test-url/" }
const RenderPokemonList = () => <WithProviders><PokemonList /></WithProviders>



describe("PokemonList", () => {

  beforeAll(() => {

    Queries.useGetAllPokemonsQuery.mockReturnValue({
      data: {
        pokemonList: [mockedPokemon],
        count: 0,
        hasNextPage: true
      },
    });

    Hooks.useFetchPokemonsDetails.mockReturnValue({
      pokemons: [{
        ...mockedPokemon,
        artWork: "/test-artwork",
        height: 100,
        weight: 100
      }],
      isError: false,
      isFetching: false,
      isSuccess: true
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", async () => {
    const { getByTestId } = await act(() => render(<RenderPokemonList />));
    expect(getByTestId("pokemon-name").textContent).toEqual(mockedPokemon.name);
    expect(getByTestId("pokemon-image", { exact: false }).src.includes("test-artwork")).toBe(true);
    expect(getByTestId("pokemon-link", { exact: false }).href.includes("test-url")).toBe(true);
  });

  it("should render the loading state if the api is still fetching", async () => {
    

    Hooks.useFetchPokemonsDetails.mockReturnValue({
      pokemons: [{
        ...mockedPokemon,
        artWork: "/test-artwork",
        height: 100,
        weight: 100
      }],
      isError: false,
      isFetching: true,
      isSuccess: true
    });

    const { getByTestId } = await act(() => render(<RenderPokemonList />));
    expect(getByTestId("loading-container")).toBeInTheDocument();
  });

  it("should render the error state if the api is still fetching", async () => {
  
    Hooks.useFetchPokemonsDetails.mockReturnValue({
      pokemons: [{
        ...mockedPokemon,
        artWork: "/test-artwork",
        height: 100,
        weight: 100
      }],
      isError: true,
      isFetching: false,
      isSuccess: false
    });

    const { getByTestId } = await act(() => render(<RenderPokemonList />));
    expect(getByTestId("error-container")).toBeInTheDocument();
  });

  it("the previous button should be enabled when the cursor is > 0", async () => {
    // it is not best practice to mock react state and test the behaviour, we should write tests that
    // mocks the behaviour of the component when UI interactions happen.
    // Thats why we click on the next button then check the previous button's disabled state here!
    const { getByTestId } = await act(() => render(<RenderPokemonList />));
    fireEvent.click(getByTestId("next-button"));
    await waitFor(() => {
      expect(getByTestId("previous-button").disabled).toEqual(false);
    });
  });

  it("the next page button is disabled when the hasNextPage is false", async () => {
    Queries.useGetAllPokemonsQuery.mockReturnValue({
      data: {
        pokemonList: [mockedPokemon],
        count: 0,
        hasNextPage: false
      },
    });
  
    const { getByTestId } = await act(() => render(<RenderPokemonList />));
    expect(getByTestId("next-button").disabled).toEqual(true);
  });


  

})