import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetchPokemonsDetails } from "./useFetchPokemonsDetails";
import { store } from '../store';
import { Provider } from 'react-redux';
import * as fetchPokmonDetailsUtils from "../store/fetch-pokemon-details";
import { useSelector } from "react-redux";

jest.mock("../store/fetch-pokemon-details", () => ({
  ...jest.requireActual("../store/fetch-pokemon-details"),
  fetchPokemonsDetails: jest.fn()
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

function Wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

describe("useFetchPokemonsDetails", () => {
  const mockedPokemon = { name: "test-name", url: "/test-url/" }
  const mockedPokemonsDetails = [
    {
      artWork: 'test',
      height: 10,
      id: 'test',
      name: 'test',
      pokemonTypes: 'test,test',
      weight: 10
    }
  ];

  beforeAll(() => {
    fetchPokmonDetailsUtils.fetchPokemonsDetails.mockReturnValue(Promise.resolve({ details: mockedPokemonsDetails, promisesStatus: ["fulfilled"]}));
  });

  it("returns the pokemons array", () => {
    const { result } = renderHook(() => useFetchPokemonsDetails({
      data: {
        pokemonList: [mockedPokemon],
        count: 0,
        hasNextPage: true,
      }
    }, { wrapper: Wrapper }));
    
    waitFor(async () => {
        await expect(result.current.pokemons).toEqual(mockedPokemonsDetails);
    })
  });
});