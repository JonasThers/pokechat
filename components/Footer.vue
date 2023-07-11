<template>
  <footer>
    <h3>Try another pokemon</h3>
    <button @click="getPokemon">Click</button>
  </footer>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Footer',
  methods: {
    ...mapActions({
      getPokemon: 'getPokemon',
    }),
  },
}
</script>

<style scoped>
footer {
  text-align: center;
}
</style>
