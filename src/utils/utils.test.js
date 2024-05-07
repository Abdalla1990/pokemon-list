import { type } from "os";
import { getPokemonIndexFromUrl, extractPokemonDetails } from ".";

describe("getPokemonIndexFromUrl", () => {
  
  it("returns the id before the last '/'", () => {
    const result = getPokemonIndexFromUrl({ url: "/test-url/1/" });
    expect(result).toEqual("1");
  });

  it("returns the id", () => {
    const result = getPokemonIndexFromUrl({ url: "/test-url/1" });
    expect(result).toEqual("1");
  });

  it("returns empty string if no url is provided", () => {
    const result = getPokemonIndexFromUrl({ url: "" });
    expect(result).toEqual("");
  });

});

describe("extractPokemonDetails", () => {
    it("returns the expected pokemon details payload", () => {
      const result = extractPokemonDetails({
        pokemon: {
          url: "/test-url/",
          id: "test-id",
          name: "test-name",
          height: 10,
          weight: 10,
          sprites: { other: { dream_world: { front_default: "/test/url" } } },
          types: [{
            type: { name: "test1"}
          }],
        },
      });
      expect(result).toEqual({
        id: "test-id",
        name: "test-name",
        height: 10,
        weight: 10,
        pokemonTypes: "test1",
        url: "/test-url/",
        artWork: "/test/url"
    });
  });
});