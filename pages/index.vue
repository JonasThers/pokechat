<template>
  <div>
    <Header />
    <Chat />
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'IndexPage',
  fetch() {
    this.getPokemon()
  },
  computed: {
    ...mapGetters({
      loadingPokemon: 'loadingPokemon',
    }),
  },
  methods: {
    ...mapActions({
      getPokemon: 'getPokemon',
    }),
  },
}
</script>
