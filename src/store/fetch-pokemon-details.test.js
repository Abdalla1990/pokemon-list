import fetchMock from "jest-fetch-mock";
import { fetchPokemonsDetails } from "./fetch-pokemon-details";

describe("fetchPokemonsDetails", () => {
  const data = {
    url: "/test-url/",
    id: "test-id",
    name: "test-name",
    height: 10,
    weight: 10,
    sprites: { other: { dream_world: { front_default: "/test/url" } } },
    types: [{
      type: { name: "test1" }
    }],
  };

  beforeAll(() => {
    fetchMock.mockOnceIf("https://pokeapi.co/api/v2/pokemon/1").mockResponse(JSON.stringify(data))
  });

  it("returns the expected results", async () => {
    const result = await fetchPokemonsDetails({
      pokemonList: [{ name: " neame", url: "/test-url/1/" }],
    });

    expect(result.details).toEqual([{
      artWork: "/test/url",
      id: "test-id",
      name: "test-name",
      height: 10,
      weight: 10,
      pokemonTypes: "test1",
      url: "/test-url/",
    }]);
  });
  it("returns an empty array if the pokemonList is empty", async () => {
    const result = await fetchPokemonsDetails({
      pokemonList: [],
    });

    expect(result.details).toEqual([]);
  })
})