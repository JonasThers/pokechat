<template>
  <section class="chat">
    <div class="chat__window">
      <li v-for="(messageInChat, index) in messagesInChat" :key=index class="chat__message" :class="'chat__message--'+messageInChat.sender">
        {{ messageInChat.content }}
      </li>
    </div>
    <form @submit="submitMessage">
      <input name="message" id="message" v-model="message" />
      <button type="submit">Submit</button>
      <p v-if="failure">Please type in a valid message</p>
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      messagesInChat: [],
      failure: false,
    }
  },
  methods: {
    submitMessage(e) {
      e.preventDefault()

      if (!this.message) {
        this.failure = true
        return
      }

      this.failure = false

      this.messagesInChat.push(
        {
          content: this.message,
          sender: 'user'
        }
      )
      this.message = '';

      this.submitPokemonMessage()
    },
    submitPokemonMessage() {
      this.messagesInChat.push(
        {
          content: this.generatePokemonMessage(),
          sender: 'pokemon'
        }
      )
    },
    generatePokemonMessage() {
      const randomNumber = Math.floor(Math.random() * 3) + 1

      return `${this.pokemonName}! `.repeat(randomNumber);
    }
  },
  computed: {
    ...mapGetters({
      pokemon: 'pokemon',
    }),
    pokemonName() {
      return this.pokemon.name ? this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1) : '...'
    }
  },
  watch: {
    pokemon() {
      this.messagesInChat = []
    }
  }
}
</script>

<style scoped>
.chat__window {
  height: 500px;
  width: 320px;
  border: 1px solid black;
  overflow-y: auto;
}

.chat__message {
  list-style-type: none;
}
</style>
