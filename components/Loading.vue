<template>
  <div class="loading">
    <Spinner />
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner'

export default {
  name: 'Loading',
  components: {
    Spinner,
  },
}
</script>

<style scoped>
.loading {
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>


