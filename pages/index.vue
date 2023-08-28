<template>
  <div class="container">
    <Header />
    <Loading v-if="loadingPokemon" />
    <div v-else>
      <Chat />
      <Footer />
    </div>
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

<style scoped>
.container {
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
</style>
