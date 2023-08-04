export const state = () => ({
  pokemon: {},
  loadingPokemon: false,
});

export const mutations = {
  pokemon(state, pokemon) {
    state.pokemon = pokemon;
  },
  loadingPokemon(state, loadingPokemon) {
    state.loadingPokemon = loadingPokemon;
  },
};

export const actions = {
  async getPokemon(ctx) {
    ctx.commit('loadingPokemon', true);

    const amountOfPokemonFirstGen = 151;
    const pokemonID = Math.floor(Math.random() * amountOfPokemonFirstGen) + 1;

    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    ).then((res) => res.json());

    try {
      ctx.commit('pokemon', pokemon);
    } catch (error) {
      console.error(error);
    } finally {
      ctx.commit('loadingPokemon', false);
    }
  },
};

export const getters = {
  pokemon: (state) => state.pokemon,
  loadingPokemon: (state) => state.loadingPokemon,
};
