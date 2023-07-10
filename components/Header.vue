<template>
  <header>
    <h2>Pokechat</h2>
    <h3>Chat with some of your favourite Pokemon!</h3>
    <h3>You're chatting with {{ pokemonName }}</h3>
    <img :src="pokemonAvatar" />
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      pokemon: 'pokemon',
    }),
    pokemonName() {
      return this.pokemon.name ? this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1) : '...'
    },
    pokemonAvatar() {
      return this.pokemon.sprites ? this.pokemon.sprites.other['official-artwork'].front_default : null
    }
  },
}
</script>
