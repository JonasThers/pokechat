<template>
  <fragment>
    <Header />
    <Chat />
    <Footer />
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
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
