
import { act, render } from "@testing-library/react";
import  Pokemon  from "./Pokemon";
import { Provider } from 'react-redux'
import { store } from "../../store";
import '@testing-library/jest-dom';

import * as Queries from "../../store/redux-api";

jest.mock("../../store/redux-api",() => ({
  ...jest.requireActual("../../store/redux-api"),
  useGetPokemonByNameQuery: jest.fn(),
}));

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn(() => ({ router: jest.fn() }))
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

const RenderPokemon = () => <WithProviders><Pokemon /></WithProviders>
const DefaultPokemonDetails = {
  id: "test-id",
  name: "test-name",
  artWork: "/test/art-work-url",
  weight: "100",
  height: "100",
  types: [{type: {name: "test1"}},{type: {name: "test2"}}]
}


describe("PokemonList", () => {

  beforeAll(() => {

    Queries.useGetPokemonByNameQuery.mockReturnValue({
      data: DefaultPokemonDetails,
      isError: false,
      isFetching: false,
      isSuccess: true
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", async () => {
    const { getAllByTestId } = await act(() => render(<RenderPokemon />));
    expect(getAllByTestId("pokemon-key")[0].textContent).toEqual("Name: ");
    expect(getAllByTestId("pokemon-value")[0].textContent).toEqual(DefaultPokemonDetails.name);
    expect(getAllByTestId("pokemon-key")[1].textContent).toEqual("Weight: ");
    expect(getAllByTestId("pokemon-value")[1].textContent).toEqual(DefaultPokemonDetails.weight);
    expect(getAllByTestId("pokemon-key")[2].textContent).toEqual("Height: ");
    expect(getAllByTestId("pokemon-value")[2].textContent).toEqual(DefaultPokemonDetails.height);
    expect(getAllByTestId("pokemon-key")[3].textContent).toEqual("Types: ");
    expect(getAllByTestId("pokemon-value")[3].textContent).toEqual("test1,test2");
  });

    it("should render the loading state if the api is still fetching", async () => {
    Queries.useGetPokemonByNameQuery.mockReturnValue({
      data: DefaultPokemonDetails,
      isError: false,
      isFetching: true,
      isSuccess: false
    });
    const { getByTestId } = await act(() => render(<RenderPokemon />));
    expect(getByTestId("loading-container")).toBeInTheDocument();
  });

  it("should render the error state if the api is still fetching", async () => {
    Queries.useGetPokemonByNameQuery.mockReturnValue({
      data: DefaultPokemonDetails,
      isError: true,
      isFetching: false,
      isSuccess: false
    });
    const { getByTestId } = await act(() => render(<RenderPokemon />));
    expect(getByTestId("error-container")).toBeInTheDocument();
  });

});