<template>
  <footer>
    <h3>Try another pokemon</h3>
    <button @click="getPokemon" :class="pokemonType">New pokemon</button>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Footer',
  methods: {
    ...mapActions({
      getPokemon: 'getPokemon',
    }),
  },
  computed: {
    ...mapGetters({
      pokemon: "pokemon",
    }),
    pokemonType() {
      return this.pokemon.types ? this.pokemon.types[0].type.name : null;
    },
  }
}
</script>

<style scoped>
footer {
  text-align: center;
  margin-top: 4rem;
  padding-bottom: 4rem;
}

button {
  padding: 10px 15px;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
}

.normal {
  background: var(--normal);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.fire {
  background: var(--fire);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.water {
  background: var(--water);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.electric {
  background: var(--electric);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.grass {
  background: var(--grass);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.ice {
  background: var(--ice);
  text-shadow: 0px 2px var(--white);
}

.fighting {
  background: var(--fighting);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.poison {
  background: var(--poison);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.ground {
  background: var(--ground);
  text-shadow: 0px 2px var(--white);
}

.flying {
  background: var(--flying);
  text-shadow: 0px 2px var(--white);
}

.psychic {
  background: var(--psychic);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.bug {
  background: var(--bug);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.rock {
  background: var(--rock);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.ghost {
  background: var(--ghost);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.dragon {
  background: var(--dragon);
  color: var(--white);
  text-shadow: 0px 2px var(--black);
}

.dark {
  background: var(--dark);
  text-shadow: 0px 2px var(--white);
}

.steel {
  background: var(--steel);
  text-shadow: 0px 2px var(--white);
}

.fairy {
  background: var(--fairy);
  color: var(--white);
  text-shadow: 0px 1.5px var(--black);
}
</style>
