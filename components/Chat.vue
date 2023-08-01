<template>
  <section class="chat">
    <div class="chat__banner" :class="pokemonType">PokeChat</div>
    <div class="chat__window">
      <div class="chat__window-header">
        <img class="chat__window-avatar" :src="pokemonAvatar" />
        <div class="chat__window-name">Hi! You'll be chatting with {{ pokemonName }}!</div>
      </div>
      <li v-for="(messageInChat, index) in messagesInChat" :key=index class="chat__message"
        :class="['chat__message--' + messageInChat.sender, pokemonType]">
        {{ messageInChat.content }}
      </li>
      <p v-if="isLoadingDots" class="chat__status">{{ status }}{{ loadingDot }}</p>
    </div>
    <form class="chat__actions" @submit="submitMessage">
      <input class="chat__actions-input" name="message" id="message" placeholder="Write your message here..."
        v-model="message" />
      <button class="chat__actions-button" type="submit">Submit</button>
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
      status: '',
      failure: false,
      loadingDot: '',
      isLoadingDots: false,
      submitsBeingProcessed: 0
    }
  },
  methods: {
    submitMessage(e) {
      e.preventDefault()

      this.submitsBeingProcessed++

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

      if (this.submitsBeingProcessed === 1) {
        setTimeout(() => {
          this.status = `${this.pokemonName} is typing`

          this.isLoadingDots = true

          const interval = setInterval(() => {
            this.generateLoadingDots()
          }, 200);

          setTimeout(() => {
            clearInterval(interval)
          }, 1400)
        }, 700)
      }

      setTimeout(() => {
        this.submitPokemonMessage()
        this.isLoadingDots = false
        this.status = ''
        this.submitsBeingProcessed--
      }, 1950)
    },
    generateLoadingDots() {
      this.loadingDot = this.loadingDot + '.'
      if (this.loadingDot === '....') {
        this.loadingDot = ''
      }
    },
    submitPokemonMessage() {
      this.messagesInChat.push(
        {
          content: this.generatePokemonMessage(),
          sender: 'pokemon'
        }
      )

      this.status = ''
    },
    generatePokemonMessage() {
      const randomNumber = Math.floor(Math.random() * 3) + 1

      return `${this.pokemonName}! `.repeat(randomNumber);
    },
  },
  computed: {
    ...mapGetters({
      pokemon: 'pokemon',
    }),
    pokemonName() {
      return this.pokemon.name ? this.pokemon.name.charAt(0).toUpperCase() + this.pokemon.name.slice(1) : '...'
    },
    pokemonAvatar() {
      return this.pokemon.sprites ? this.pokemon.sprites.versions['generation-i']['red-blue'].front_default : null
    },
    pokemonType() {
      return this.pokemon.types ? this.pokemon.types[0].type.name : null
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
.normal {
  background: var(--normal);
  color: var(--white);
}

.fire {
  background: var(--fire);
  color: var(--white);
}

.water {
  background: var(--water);
  color: var(--white);
}

.electric {
  background: var(--electric);
  color: var(--white);
}

.grass {
  background: var(--grass);
  color: var(--white);
}

.ice {
  background: var(--ice);
}

.fighting {
  background: var(--fighting);
  color: var(--white);
}

.poison {
  background: var(--poison);
  color: var(--white);
}

.ground {
  background: var(--ground);
}

.flying {
  background: var(--flying);
}

.psychic {
  background: var(--psychic);
  color: var(--white);
}

.bug {
  background: var(--bug);
  color: var(--white);
}

.rock {
  background: var(--rock);
  color: var(--white);
}

.ghost {
  background: var(--ghost);
  color: var(--white);
}

.dragon {
  background: var(--dragon);
  color: var(--white);
}

.dark {
  background: var(--dark);
}

.steel {
  background: var(--steel);
}

.fairy {
  background: var(--fairy);
  color: var(--white);
}


.chat__window {
  height: 350px;
  width: 320px;
  border: 1px solid var(--black);
  overflow-y: auto;
  padding: 7.5px;
}

.chat__banner {
  padding: 10px 10px;
}

.chat__window-header {
  margin-bottom: 10px;
  text-align: center;
}

.chat__window-avatar {
  height: 70px;
  margin-bottom: 5px;
}

.chat__message {
  list-style-type: none;
  border-radius: 25px;
  padding: 5px 15px;
  margin-bottom: 5px;
}

.chat__status {
  text-align: left;
  font-size: 12px;
}

.chat__actions {
  display: flex;
  height: 32px;
}

.chat__actions-input {
  width: 70%;
  padding: 5px;
}

.chat__actions-button {
  width: 30%;
}
</style>
